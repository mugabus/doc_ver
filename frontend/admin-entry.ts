/**
 * Entry shim for the React admin SPA.
 *
 * Vite's root is this folder (frontend/), while the app lives in ../src.
 * Referencing ../src/main.tsx directly from admin.html does not work in the
 * dev server: the browser normalizes it to /src/main.tsx, which does not
 * exist under the root, so Vite's SPA fallback returns HTML (MIME mismatch)
 * and the page stays white. Importing the real entry as a module works —
 * Vite rewrites JS imports that sit outside the root to /@fs/... URLs.
 */
import '../src/main.tsx';
