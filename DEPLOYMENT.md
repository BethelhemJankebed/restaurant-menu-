# Le Bordeaux — Production Deployment Guide

This guide provides complete instructions for deploying the **Le Bordeaux** digital restaurant menu and management system to production environments.

---

## 1. Quick Production Verification

Before deploying, ensure dependencies are up to date and the production build compiles cleanly:

```bash
# 1. Install dependencies
npm ci

# 2. Run database migrations or push schema
npm run db:push

# 3. Seed initial categories and menu items (if fresh database)
npm run db:seed

# 4. Build optimized production bundle
npm run build

# 5. Start production server
npm run start
```

---

## 2. Environment Variables Configuration

Create a `.env` file in the root directory (based on `.env.example`):

| Variable | Description | Example (Production) |
| :--- | :--- | :--- |
| `DATABASE_URL` | Prisma database connection string | `file:./prisma/prod.db` or PostgreSQL connection URI |
| `JWT_SECRET` | Secret key for signing admin session tokens | `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | Public domain of the application | `https://lebordeaux.et` |
| `NODE_ENV` | Environment mode | `production` |

> [!CAUTION]
> Always generate a secure, unique `JWT_SECRET` in production using `openssl rand -base64 32`. Never commit the `.env` file to version control.

---

## 3. Deployment Options

### Option A: Docker & Docker Compose (Recommended for VPS / Cloud VMs)

The project includes a production-ready, multi-stage `Dockerfile` and `docker-compose.yml` with health checks and persistent volume storage.

1. **Clone repository onto server:**
   ```bash
   git clone <repo-url> /opt/lebordeaux
   cd /opt/lebordeaux
   ```

2. **Configure production environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your secure JWT_SECRET and production domain
   nano .env
   ```

3. **Start container in background:**
   ```bash
   docker compose up -d --build
   ```

4. **Verify container health:**
   ```bash
   docker compose ps
   curl http://localhost:3000/api/health
   ```

5. **Data persistence:**
   - Database is safely mounted at the `db_data` volume.
   - Dish image uploads are safely persisted in `uploads_data`.

---

### Option B: Vercel (Instant Zero-Config Cloud)

If deploying to Vercel, use a hosted PostgreSQL or MySQL database (such as Supabase, Neon, Prisma Postgres, or PlanetScale), because serverless functions have ephemeral filesystems.

1. **Switch Database to PostgreSQL** (if using serverless):
   In `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. **Push schema to hosted database:**
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
3. **Deploy on Vercel:**
   - Connect your GitHub repository to [Vercel](https://vercel.com).
   - Add environment variables in Vercel Project Settings:
     - `DATABASE_URL`: Your hosted PostgreSQL URI
     - `JWT_SECRET`: Your secure secret
     - `NEXT_PUBLIC_APP_URL`: Your Vercel production domain
   - Deploy! Build command `npm run build` will automatically run `prisma generate && next build`.

---

### Option C: Ubuntu VPS (PM2 + Nginx + Let's Encrypt SSL)

For hosting directly on a Linux VPS (DigitalOcean, Hetzner, AWS EC2, Linode):

1. **Install Node.js 20 & PM2:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx
   sudo npm install -g pm2
   ```

2. **Setup application:**
   ```bash
   cd /var/www/lebordeaux
   npm ci
   npm run db:push
   npm run db:seed
   npm run build
   ```

3. **Start process with PM2:**
   ```bash
   pm2 start npm --name "lebordeaux" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/lebordeaux`):**
   ```nginx
   server {
       server_name lebordeaux.et www.lebordeaux.et;

       client_max_body_size 15M;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

5. **Enable site and issue Free SSL:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/lebordeaux /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d lebordeaux.et -d www.lebordeaux.et
   ```

---

## 4. Production Security & Health Monitoring

### Health Check Endpoint
The application exposes an automated health check at:
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-10-12T14:30:00.000Z",
  "database": {
    "status": "connected",
    "latencyMs": 4,
    "categoryCount": 13
  },
  "uptime": 12450.8,
  "environment": "production"
}
```

Use this URL with monitoring tools such as:
- UptimeRobot
- BetterStack
- AWS CloudWatch Route 53 Health Checks
- Docker healthcheck probes

### Built-in Security Headers
`next.config.js` automatically applies production HTTP security headers:
- `X-Frame-Options: SAMEORIGIN` (prevents clickjacking)
- `X-Content-Type-Options: nosniff` (MIME sniffing prevention)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `poweredByHeader: false` (hides server implementation details)
- `compress: true` (compresses text responses via gzip/brotli)

---

## 5. Admin Authentication & Production Credentials

1. **Default seeded credentials:**
   - Email: `admin@restaurant.com`
   - Password: `admin123`
2. **Post-Deployment Requirement:**
   - Sign in at `/admin`.
   - Update the administrator password immediately to a strong, production-grade password.
