# ============== Stage 1: Install dependencies ==============
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# ============== Stage 2: Production (minimal runtime) ==============
FROM node:20-alpine AS runner

WORKDIR /app

# Copy dependencies and app (no devDependencies)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY . .

EXPOSE 4000

CMD ["npm", "start"]