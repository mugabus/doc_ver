# CIRGL — Système de Certification des Minerais

Application web (React + Vite + TypeScript + Tailwind + Supabase) pour la génération,
la gestion et la vérification en ligne des certificats d'exportation CIRGL, avec
authentification par code QR.

## Démarrage local

```bash
npm install
npm run dev
```

Variables d'environnement requies (fichier `.env` à la racine) :

```
VITE_SUPABASE_URL=https://<votre-projet>.supabase.co
VITE_SUPABASE_ANON_KEY=<votre-clé-anon>
```

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

### Routage SPA

L'application utilise `react-router` (`BrowserRouter`). La règle de rewrite dans
`vercel.json` renvoie toutes les URLs vers `index.html`, ce qui permet :

- le rafraîchissement direct de `/dashboard`, `/generate`, `/about`, etc. ;
- l'ouverture des liens de vérification `/verify?code=<numéro>` scannés depuis
  les QR codes des certificats.

Les fichiers statiques (`/flags/*.svg`, `/logo.png`, assets hashés) restent
servis directement par Vercel — les rewrites ne s'appliquent qu'aux URLs sans
fichier correspondant.

### Base de données

Le schéma Supabase est géré par les migrations dans `supabase/migrations/`
(table `certificates` + RLS : lecture publique, insertion ouverte). Elles sont
appliquées via le Supabase Dashboard / CLI, indépendamment de Vercel.

## Structure

```
src/
  components/    CertificateGenerator, CertificateViewer, Dashboard, Login, Layout
  pages/         Home, About, Services, News, Contact
  lib/           supabase.ts (client), database.ts (CRUD certificats), memberCountries.ts
public/
  flags/         Drapeaux SVG des 12 pays membres CIRGL
```

