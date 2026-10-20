import { defineConfig, Plugin, Connect } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { cpSync } from 'node:fs';

// Resolve a path relative to the project root (this config file).
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// The template pages reference plain (non-module) assets as absolute public
// URLs (/css/..., /js/..., /images/...). Vite deliberately does not bundle
// non-module <script> tags, so copy the raw asset folders into dist as-is.
const TEMPLATE_ASSET_DIRS = ['css', 'js', 'fonts', 'images'];
function copyTemplateAssets(): Plugin {
  return {
    name: 'copy-template-assets',
    closeBundle() {
      const dist = r('./dist');
      for (const dir of TEMPLATE_ASSET_DIRS) {
        cpSync(r(`./frontend/${dir}`), `${dist}/${dir}`, { recursive: true });
      }
    },
  };
}

// The admin SPA (React, src/) keeps its original clean URLs — /login,
// /dashboard, /generate — served by frontend/admin.html. In production these
// paths are mapped by the rewrites in vercel.json; this plugin does the same
// mapping for `vite dev` and `vite preview` so the dashboard behaves exactly
// like before.
const ADMIN_PATHS = new Set(['/admin', '/dashboard', '/generate', '/login']);
function spaAdminFallback(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, _res, next) => {
    const raw = req.url || '';
    const qIndex = raw.indexOf('?');
    const path = qIndex === -1 ? raw : raw.slice(0, qIndex);
    if (ADMIN_PATHS.has(path)) {
      req.url = '/admin.html' + (qIndex === -1 ? '' : raw.slice(qIndex));
    }
    next();
  };
  return {
    name: 'spa-admin-fallback',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

// The static ICGLR template in frontend/ is the public site served at "/".
// The React SPA (src/) is the admin panel, served at /admin.html.
export default defineConfig({
  root: r('./frontend'),
  // Vite loads .env files from `envDir`, which defaults to `root`. The root
  // is frontend/ but .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) lives
  // at the project root — without this, the admin app throws
  // "Missing Supabase environment variables" and renders a white page.
  envDir: r('.'),
  publicDir: r('./public'),
  plugins: [react(), copyTemplateAssets(), spaAdminFallback()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Allow the admin entry (frontend/admin.html) to load ../src/main.tsx.
    fs: {
      allow: [r('.')],
    },
  },
  build: {
    outDir: r('./dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: r('./frontend/index.html'),
        about: r('./frontend/about.html'),
        apply: r('./frontend/apply.html'),
        assessment: r('./frontend/assessment.html'),
        compliance: r('./frontend/compliance.html'),
        contact: r('./frontend/contact.html'),
        news: r('./frontend/news.html'),
        verify: r('./frontend/verify.html'),
        admin: r('./frontend/admin.html'),
      },
    },
  },
});

