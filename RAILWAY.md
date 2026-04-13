# Deploying Resillix CMS on Railway

[Railway](https://railway.app) is a cloud platform that makes it easy to deploy full-stack applications. This guide walks you through deploying Resillix CMS on Railway with a PostgreSQL database.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deploying from GitHub](#deploying-from-github)
3. [Adding a PostgreSQL Database](#adding-a-postgresql-database)
4. [Configuring Environment Variables](#configuring-environment-variables)
5. [Setting the Public URL](#setting-the-public-url)
6. [Deploying and Verifying](#deploying-and-verifying)
7. [Environment Variable Reference](#environment-variable-reference)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A [Railway](https://railway.app) account (free tier available)
- Your Resillix CMS repository hosted on GitHub (fork or clone of this repo)
- Node.js 20+ installed locally for development

---

## Deploying from GitHub

1. Log in to [Railway](https://railway.app) and click **New Project**.
2. Select **Deploy from GitHub repo**.
3. Authorize Railway to access your GitHub account and select your repository.
4. Railway will detect the `railway.toml` at the repository root and configure the build automatically.

> **Monorepo note:** The root `railway.toml` targets the `examples/getstarted` app. If you want to deploy a different app (e.g., your own CMS project), update the `buildCommand` and `startCommand` in `railway.toml` accordingly.

---

## Adding a PostgreSQL Database

Resillix CMS requires a database. Railway provides managed PostgreSQL as a plugin:

1. Inside your Railway project, click **+ New** → **Database** → **Add PostgreSQL**.
2. Railway automatically provisions a PostgreSQL instance and injects `DATABASE_URL` into your service's environment.
3. No manual connection string setup is required — the CMS reads `DATABASE_URL` automatically.

---

## Configuring Environment Variables

Go to your service in Railway → **Variables** tab and add the following variables. Copy the values from `.env.example` and replace placeholders with real secrets.

### Generate secure secret values

Run this in your terminal to generate each secret:

```bash
openssl rand -base64 32
```

### Required variables

| Variable              | Description                                      | Example value                    |
|-----------------------|--------------------------------------------------|----------------------------------|
| `APP_KEYS`            | Comma-separated list of session keys             | `key1,key2`                      |
| `ADMIN_JWT_SECRET`    | Secret used to sign admin JWT tokens             | *(generated)*                    |
| `API_TOKEN_SALT`      | Salt for API token hashing                       | *(generated)*                    |
| `ENCRYPTION_KEY`      | Key used for data encryption                     | *(generated)*                    |
| `TRANSFER_TOKEN_SALT` | Salt for transfer token hashing                  | *(generated)*                    |
| `DATABASE_CLIENT`     | Database driver (`postgres`, `mysql`, `sqlite`)  | `postgres`                       |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Set to `true` to enforce SSL cert validation (recommended in production) | `true` |
| `URL`                 | Public URL of the deployment (see next section)  | `https://your-app.up.railway.app`|

> `DATABASE_URL` is injected automatically by the Railway PostgreSQL plugin — you do not need to set it manually.

---

## Setting the Public URL

Railway assigns a public domain to each deployment. You must set the `URL` variable to this domain so that the CMS generates correct absolute URLs (for media, webhooks, etc.).

1. In your service, go to **Settings** → **Networking** → **Generate Domain** (if you haven't already).
2. Copy the generated domain (e.g., `https://your-app.up.railway.app`).
3. In the **Variables** tab, set:

```
URL=https://your-app.up.railway.app
```

---

## Deploying and Verifying

1. After setting all variables, click **Deploy** (or push a commit — Railway redeploys on every push).
2. Watch the build logs in Railway to confirm the build and migration complete successfully.
3. Open your Railway public URL in a browser. You should see the Resillix CMS welcome screen.
4. Visit `https://your-app.up.railway.app/admin` to create your first administrator account.

---

## Environment Variable Reference

Below is a full reference of all supported environment variables. Copy `.env.example` as a starting point.

```
# Server
HOST=0.0.0.0
PORT=1337                         # Set automatically by Railway
URL=https://your-app.up.railway.app

# Secrets
APP_KEYS=key1,key2
ADMIN_JWT_SECRET=<generated>
API_TOKEN_SALT=<generated>
ENCRYPTION_KEY=<generated>
TRANSFER_TOKEN_SALT=<generated>

# Database
DATABASE_CLIENT=postgres          # postgres | mysql | sqlite
DATABASE_URL=<set by Railway PostgreSQL plugin>
DATABASE_SSL_REJECT_UNAUTHORIZED=true  # set to false only if using self-signed certs

# Optional: manual database connection (if not using DATABASE_URL)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=resillix
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

---

## Troubleshooting

### Build fails with "module not found"

Ensure `DATABASE_CLIENT` is set to `postgres` and the PostgreSQL plugin is attached to your Railway project.

### "Access denied" or "CORS error" in the browser

Make sure `URL` is set to the exact public domain Railway assigned (including `https://`).

### The app keeps restarting

- Check that all required secrets (`APP_KEYS`, `ADMIN_JWT_SECRET`, etc.) are set.
- Review the Railway deploy logs for stack traces.

### Database migrations fail

Railway runs the app using `yarn start`, which does not run migrations automatically on every start. If you need to run migrations, add a `release` command in `railway.toml`:

```toml
[deploy]
releaseCommand = "yarn workspace getstarted strapi migration:run"
startCommand = "yarn workspace getstarted start"
```

### Custom domain

To use a custom domain, go to **Settings** → **Networking** → **Custom Domain** in Railway, add your domain, update your DNS records, and update the `URL` environment variable to match your custom domain.

---

## Further Resources

- [Railway Documentation](https://docs.railway.app)
- [Resillix CMS Documentation](./docs)
- [Resillix CMS GitHub Issues](https://github.com/Dhananjay-latpate/RCMS/issues)
