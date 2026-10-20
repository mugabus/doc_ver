/**
 * Certificate Application Popup Script
 *
 * This script handles the functionality for the certificate application popup.
 * Import this file in any page where you need to use the openApplyPopup() function.
 */

// Execute once DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Create popup HTML if it doesn't exist
  if (!document.getElementById("applyPopup")) {
    createApplyPopup();
  }

  // Add event listeners
  setupEventListeners();
});

/**
 * Creates and adds the popup HTML to the document body
 */
function createApplyPopup() {
  const domain = window.DOMAIN || "icglrcertification.org";
  // Create popup HTML structure
  const popupHTML = `
      <div id="applyPopup" class="popup-overlay" style="display: none;">
        <div class="popup-container">
          <div class="popup-header">
            <h3>How to Apply for Certificate</h3>
            <span class="close-btn" onclick="closeApplyPopup()">&times;</span>
          </div>
          <div class="popup-content">
            <h4>Instructions</h4>
            <p>In order to apply, please email the following details to <strong><a href="mailto:certification@${domain}">certification@${domain}</a></strong>:</p>
            
            <h5>Exporter Information</h5>
            <ul style='list-style-type: circle;'>
              <li>Company name and registration number</li>
              <li>Physical and postal address</li>
              <li>Contact person and contact details</li>
              <li>Exporter license or trading license</li>
              <li>Consignment Details (Weight, Purity, Origin, Destination)</li>
            </ul>
            
            <p>Once your email is received, instructions for the next steps will be sent to you via email.</p>
          </div>
        </div>
      </div>
    `;

  // Add styles to head
  const styleElement = document.createElement("style");
  styleElement.textContent = `
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .popup-container {
        background-color: white;
        border-radius: 8px;
        width: 90%;
        max-width: 600px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
      }
      
      .popup-header h3 {
        margin: 0;
        color: #333;
      }
      
      .close-btn {
        font-size: 24px;
        cursor: pointer;
        color: #777;
      }
      
      .close-btn:hover {
        color: #333;
      }
      
      .popup-content {
        padding: 20px;
      }
      
      .popup-content h4 {
        margin-top: 0;
        color: #333;
      }
      
      .popup-content ul {
        padding-left: 20px;
      }
      
      .popup-content li {
        margin-bottom: 8px;
      }
    `;

  // Add style and popup HTML to document
  document.head.appendChild(styleElement);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = popupHTML;
  document.body.appendChild(tempDiv.firstElementChild);
}

/**
 * Sets up all event listeners for the popup
 */
function setupEventListeners() {
  // Close popup when clicking outside the popup container
  window.addEventListener("click", function (event) {
    const popup = document.getElementById("applyPopup");
    if (popup && event.target === popup) {
      closeApplyPopup();
    }
  });

  // Close popup when pressing ESC key
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeApplyPopup();
    }
  });
}

/**
 * Opens the application popup
 * Can be called from any page after importing this script
 */
function openApplyPopup() {
  const popup = document.getElementById("applyPopup");

  // Create popup if it doesn't exist yet
  if (!popup) {
    createApplyPopup();
  }

  document.getElementById("applyPopup").style.display = "flex";
}

/**
 * Closes the application popup
 */
function closeApplyPopup() {
  const popup = document.getElementById("applyPopup");
  if (popup) {
    popup.style.display = "none";
  }
}

// Make functions available globally
window.openApplyPopup = openApplyPopup;
window.closeApplyPopup = closeApplyPopup;
