# CIRGL — Système de Certification des Minerais

Système web pour la génération, la gestion et la vérification en ligne des
certificats d'exportation CIRGL, avec authentification par code QR.

Deux parties :

- **Site public** — le template statique HTML/CSS/JS du dossier `frontend/`
  (page d'accueil, Verify ICGLR, Assessment, etc.), connecté à la base
  Supabase via `frontend/js/backend.js` (vérification des certificats).
- **Panneau d'administration** — l'application React (`src/`, Vite +
  TypeScript + Tailwind + Supabase), servie sur **`/admin.html`** :
  génération des certificats (PDF + QR), dashboard, login.

## Démarrage local

```bash
npm install
npm run dev
```

- `http://localhost:5173/` → **site public** (template `frontend/`)
- `http://localhost:5173/verify.html?code=<numéro>` → vérification d'un certificat
- `http://localhost:5173/dashboard` → **panneau d'administration** React
  (aussi `/login` et `/generate`, comme avant)

Variables d'environnement requises (fichier `.env` à la racine) — uniquement
pour le panneau d'administration React :

```
VITE_SUPABASE_URL=https://<votre-projet>.supabase.co
VITE_SUPABASE_ANON_KEY=<votre-clé-anon>
```

Le site statique lit les mêmes identifiants Supabase (anon, public) dans
`frontend/js/config.js`.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Vérification TypeScript puis build de production (`dist/`) |
| `npm run preview` | Prévisualisation locale du build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript seule |

## Déploiement sur Vercel

Le dépôt contient déjà un fichier `vercel.json` (framework Vite, rewrites SPA,
cache des assets) — aucune configuration build manuelle n'est nécessaire.

1. Pousser le code sur GitHub (`https://github.com/mugabus/doc_ver.git`).
2. Sur [vercel.com](https://vercel.com) : **Add New → Project** → importer le dépôt.
3. Vercel détecte Vite automatiquement. Vérifier :
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
4. **Important** — dans **Settings → Environment Variables**, ajouter
   (pour Production, Preview et Development) :

   | Nom | Valeur |
   | --- | --- |
   | `VITE_SUPABASE_URL` | URL du projet Supabase |
   | `VITE_SUPABASE_ANON_KEY` | Clé anon (publique) Supabase |

   Sans ces variables, le build échoue (`Missing Supabase environment variables`).
5. Cliquer **Deploy**.

> Le fichier `.env` local est ignoré par Git (`.gitignore`) : il ne part jamais
> sur Vercel, d'où la saisie manuelle des variables dans le dashboard.

### Routage

Vite sert le dossier `frontend/` comme racine (`root` dans `vite.config.ts`) :
les pages du template (`index.html`, `verify.html`, `assessment.html`, …) sont
des fichiers statiques ; les assets (`/css`, `/js`, `/images`, `/fonts`) sont
copiés tels quels dans `dist/` par le plugin `copy-template-assets`.

Le panneau d'administration utilise `react-router` avec `BrowserRouter` et ses
URL d'origine — `/login`, `/dashboard`, `/generate` (l'entrée est
`frontend/admin.html`). Ces chemins sans extension sont mappés vers le fichier
d'entrée par :

- le plugin `spaAdminFallback` dans `vite.config.ts` pour `vite dev` et
  `vite preview` ;
- les rewrites `vercel.json` en production.

Les rewrites `vercel.json` assurent aussi la compatibilité :

- `/verify` → `/verify.html` (anciens QR codes de l'app React) ;
- `/admin` → `/admin.html` (ouvre le dashboard) ;
- tout le reste sans fichier correspondant → `/index.html` (site public).

Les QR codes générés pointent vers `/verify.html?code=<numéro>`, ouvert par la
page de vérification du site statique (`js/backend.js` interroge Supabase).

### Base de données

Le schéma Supabase est géré par les migrations dans `supabase/migrations/`
(table `certificates` + RLS : lecture publique, insertion ouverte). Elles sont
appliquées via le Supabase Dashboard / CLI, indépendamment de Vercel.

## Structure

```
frontend/          Site public statique (pages HTML du template)
  js/backend.js    Intégration Supabase (lookup certificats — verify, assessment)
  js/config.js     Identifiants Supabase anon (publics)
  admin.html       Point d'entrée du panneau d'administration React
src/               Panneau d'administration React
  components/      CertificateGenerator, CertificateViewer, Dashboard, Login, Layout
  pages/           Home, About, Services, News, Contact
  lib/             supabase.ts (client), database.ts (CRUD certificats), memberCountries.ts
public/            Assets servis à la racine (drapeaux /flags, échantillons, templates PDF)
supabase/migrations/  Schéma de la table certificates (+ RLS)
```

