# Strapi Migration Plan — Export / Import

> Goal: migrate PostgreSQL DB after changing `year` field type in `shared-title-description` component
> Strategy: export data → wipe DB → deploy new image → import data

---

## Pre-requisites

- Local Strapi is running and connected to a DB that has existing data
- Docker & Docker Compose installed on the server
- SSH access to the production server

---

## Phase 1 — Export Data (Local Machine)

```bash
cd Startime-website/strapi

# Export all content to a single archive (no encryption for simplicity)
yarn strapi export --no-encrypt --file backup
```

This creates **`backup.tar.gz`** in the current directory.

> Contains: all content entries, media references, settings, locales

---

## Phase 2 — Transfer Backup to Server

```bash
scp backup.tar.gz user@your-server:/path/to/project/Startime-website/strapi/
```

---

## Phase 3 — Deploy New Docker Image (Server)

```bash
cd /path/to/project/Startime-website/strapi

# 1. Stop running containers
docker-compose down

# 2. Wipe the old PostgreSQL volume (drops old schema + data)
docker volume rm strapi_db

# 3. Build new image with updated schema
docker-compose build --no-cache

# 4. Start containers — Strapi creates fresh schema with new types
docker-compose up -d

# 5. Wait for Strapi to fully start (watch logs)
docker-compose logs -f strapi
#    Wait until you see: "Strapi started successfully"
#    Then Ctrl+C
```

> At this point the DB is empty but has the **correct schema** with `year` as `VARCHAR(255)`

---

## Phase 4 — Import Data (Server)

```bash
# Run import inside the running strapi container
docker-compose exec strapi yarn strapi import \
  --file /app/backup.tar.gz \
  --force-conflicts-resolution
```

> `--force-conflicts-resolution` handles any minor type mismatches during import

---

## Phase 5 — Verify

```bash
# Check strapi logs for errors
docker-compose logs strapi

# Connect to postgres and verify the column type
docker-compose exec postgres psql -U strapi -d strapi -c \
  "SELECT column_name, data_type FROM information_schema.columns \
   WHERE table_name = 'components_shared_shared_title_descriptions' \
   AND column_name = 'year';"
```

Expected result:
```
 column_name | data_type
-------------+------------------------
 year        | character varying
```

---

## Rollback Plan

If something goes wrong after import:

```bash
# Stop containers
docker-compose down

# Wipe broken volume
docker volume rm strapi_db

# Rebuild from previous image tag (if you tagged it)
docker-compose up -d
```

Or restore from the `backup.tar.gz` again after fixing the issue.

---

## Notes

- `strapi_public` volume (uploaded media files) is **not wiped** — media files are preserved
- The migration file `database/migrations/2026.03.17.00.00.00.change-timeline-year-to-string.js` is safe to keep — on a fresh DB it detects no column and skips
- Do this during **low-traffic hours** to minimize downtime
