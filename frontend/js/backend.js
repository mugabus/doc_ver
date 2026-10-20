/**
 * ICGLR backend integration for the static frontend (frontend/ folder).
 *
 * Port of the React app logic (src/lib/database.ts +
 * src/components/CertificateViewer.tsx) so the static pages query the same
 * Supabase `certificates` table:
 *
 *   - verify.html     : "Verify ICGLR" certificate lookup
 *                       (also supports verify.html?code=<number> for QR
 *                        scans, matching the app's /verify?code=<number>)
 *   - assessment.html : "Lookup ICGLR Assessment" (same lookup; the legacy
 *                       "ICGLR " ID prefix is tolerated)
 *
 * Requires, loaded before this file:
 *   - https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2  (window.supabase)
 *   - js/config.js                                           (window.ICGLR_CONFIG)
 */
(function () {
  "use strict";

  var config = window.ICGLR_CONFIG || {};

  // Supabase client — same public anon credentials as src/lib/supabase.ts.
  var client =
    window.supabase && config.supabaseUrl && config.supabaseAnonKey
      ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
      : null;

  /* ------------------------------------------------------------------ */
  /* Database helpers (mirror of src/lib/database.ts)                    */
  /* ------------------------------------------------------------------ */

  // Get a certificate by certificate number (upper-cased, like the app).
  function getCertificateByNumber(certificateNumber) {
    if (!client) {
      return Promise.reject(new Error("Backend is not configured (see js/config.js)"));
    }
    return client
      .from("certificates")
      .select("*")
      .eq("certificate_number", String(certificateNumber).trim().toUpperCase())
      .single();
  }

  /* ------------------------------------------------------------------ */
  /* Rendering helpers (mirrors src/components/CertificateViewer.tsx)   */
  /* ------------------------------------------------------------------ */

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(value) {
    if (!value) return "—";
    var date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString("fr-FR");
  }

  function row(label, value) {
    if (value === undefined || value === null || String(value).trim() === "") {
      return "";
    }
    return "<tr><th>" + escapeHtml(label) + "</th><td>" + escapeHtml(value) + "</td></tr>";
  }

  // Optional Congo/RDC template detail columns (migration 20260213182500).
  var CONGO_ROWS = [
    ["Minerals", "minerals"],
    ["Chemical Symbol", "chemical_symbol"],
    ["Net Weight (kg)", "net_weight_kg"],
    ["Content (%)", "content_percent"],
    ["Metal Contained", "metal_contained"],
    ["Value (USD)", "value_usd"],
    ["Containers", "containers"],
    ["Packing Type", "packing_type"],
    ["Transiting", "transiting"],
    ["Carrier Name", "carrier_name"],
    ["Issued In", "issued_in"],
  ];

  // Injected once — matches the template's #044a67 theme.
  var styleInjected = false;
  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;
    var style = document.createElement("style");
    style.textContent = [
      ".icglr-lookup-result { max-width: 50em; margin: 20px auto 0; font-family: 'Work Sans', sans-serif; }",
      ".icglr-lookup-status { padding: 12px 15px; border-radius: 6px; font-weight: 600; margin-bottom: 15px; text-align: center; }",
      ".icglr-lookup-status.is-valid { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }",
      ".icglr-lookup-status.is-expired { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }",
      ".icglr-lookup-status.is-error { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }",
      ".icglr-lookup-status.is-info { background: #e3f2fd; color: #044a67; border: 1px solid #90caf9; }",
      ".icglr-lookup-note { font-size: 0.8em; color: #777; text-align: center; margin-top: 10px; }",
    ].join("\n");
    document.head.appendChild(style);
  }

  function renderMessage(container, type, text) {
    injectStyles();
    container.innerHTML =
      '<div class="icglr-lookup-result"><div class="icglr-lookup-status is-' +
      type +
      '">' +
      escapeHtml(text) +
      "</div></div>";
  }

  function renderCertificate(container, certificate) {
    injectStyles();
    var now = new Date();
    var expired =
      certificate.expiration_date &&
      new Date(certificate.expiration_date) <= now;

    var statusHtml = expired
      ? '<div class="icglr-lookup-status is-expired">&#10006; Certificate EXPIRED — this certificate is no longer valid</div>'
      : '<div class="icglr-lookup-status is-valid">&#10004; Certificate VALID — this certificate is authentic and active</div>';

    var body =
      row("Certificate Number", certificate.certificate_number) +
      row("Loading Number", certificate.loading_number) +
      row("Origin Country", certificate.origin_country) +
      row("Province", certificate.province) +
      row("Exporter", certificate.exporter_name) +
      row("Exporter Address", certificate.exporter_address) +
      row("Importer", certificate.importer_name) +
      row("Importer Address", certificate.importer_address) +
      row("Export License No.", certificate.export_license) +
      row("Quantity", certificate.quantity ? certificate.quantity + " kg" : "") +
      row("Shipment Date", formatDate(certificate.shipment_date)) +
      row("Expiration Date", formatDate(certificate.expiration_date));

    CONGO_ROWS.forEach(function (pair) {
      body += row(pair[0], certificate[pair[1]]);
    });

    container.innerHTML =
      '<div class="icglr-lookup-result">' +
      statusHtml +
      "<table><tbody>" +
      body +
      "</tbody></table>" +
      '<p class="icglr-lookup-note">This certificate was generated electronically and is valid without signature.</p>' +
      "</div>";
  }

  /* ------------------------------------------------------------------ */
  /* Lookup flow                                                         */
  /* ------------------------------------------------------------------ */

  // Candidate numbers to try: the raw value (upper-cased in the query) and,
  // optionally, the value without a legacy "ICGLR " prefix.
  function buildCandidates(rawCode, allowPrefixFallback) {
    var raw = String(rawCode).trim();
    var candidates = [raw];
    if (allowPrefixFallback) {
      var stripped = raw.replace(/^ICGLR[\s-]+/i, "").trim();
      if (stripped && stripped !== raw) candidates.push(stripped);
    }
    return candidates;
  }

  // Try each candidate in order; PostgREST error PGRST116 means "no rows".
  function tryCandidates(candidates) {
    var chain = Promise.resolve(null);
    candidates.forEach(function (candidate) {
      chain = chain.then(function (found) {
        if (found) return found;
        return getCertificateByNumber(candidate).then(function (result) {
          if (result.error) {
            if (result.error.code === "PGRST116") return null;
            throw result.error;
          }
          return result.data;
        });
      });
    });
    return chain;
  }

  function runLookup(rawCode, container, options) {
    options = options || {};
    renderMessage(container, "info", "Searching the ICGLR database…");
    return tryCandidates(buildCandidates(rawCode, options.allowPrefixFallback))
      .then(function (certificate) {
        if (certificate) {
          renderCertificate(container, certificate);
        } else {
          renderMessage(
            container,
            "error",
            'No certificate found for "' + rawCode + '". Please check the number and try again.'
          );
        }
      })
      .catch(function (error) {
        console.error("Lookup failed:", error);
        renderMessage(
          container,
          "error",
          "The verification service is temporarily unavailable. Please try again later."
        );
      });
  }

  /* ------------------------------------------------------------------ */
  /* Page wiring                                                         */
  /* ------------------------------------------------------------------ */

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    // --- verify.html : certificate lookup (+ ?code= for QR scans) ---
    var verifyForm = document.getElementById("verifyForm");
    var verifyResult = document.getElementById("verifyResult");
    if (verifyForm && verifyResult) {
      var codeInput = document.getElementById("certificateNumber");
      var submitLookup = function (event) {
        if (event) event.preventDefault();
        var code = codeInput ? codeInput.value.trim() : "";
        if (!code) {
          renderMessage(verifyResult, "error", "Please enter a certificate number.");
          return;
        }
        if (window.history && window.history.replaceState) {
          window.history.replaceState(
            null,
            "",
            "verify.html?code=" + encodeURIComponent(code)
          );
        }
        runLookup(code, verifyResult);
      };
      verifyForm.addEventListener("submit", submitLookup);

      // Auto-lookup when opened as verify.html?code=<number> (QR scan).
      var initialCode = new URLSearchParams(window.location.search).get("code");
      if (initialCode) {
        if (codeInput) codeInput.value = initialCode;
        submitLookup();
      }
    }

    // --- assessment.html : "Lookup ICGLR Assessment" ---
    var assessmentForm = document.getElementById("assessmentLookupForm");
    var assessmentResult = document.getElementById("assessmentResult");
    if (assessmentForm && assessmentResult) {
      var assessmentInput = document.getElementById("assessmentCode");
      var submitAssessment = function (event) {
        if (event) event.preventDefault();
        var code = assessmentInput ? assessmentInput.value.trim() : "";
        if (!code) {
          renderMessage(assessmentResult, "error", "Please enter an assessment ID.");
          return;
        }
        if (window.history && window.history.replaceState) {
          window.history.replaceState(
            null,
            "",
            "assessment.html?code=" + encodeURIComponent(code)
          );
        }
        runLookup(code, assessmentResult, { allowPrefixFallback: true });
      };
      assessmentForm.addEventListener("submit", submitAssessment);

      var assessmentCode = new URLSearchParams(window.location.search).get("code");
      if (assessmentCode) {
        if (assessmentInput) assessmentInput.value = assessmentCode;
        submitAssessment();
      }
    }
  });
})();
