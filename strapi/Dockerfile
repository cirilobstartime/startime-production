FROM node:20-alpine

WORKDIR /app

# Install dependencies (including devDeps for TypeScript build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

ENV NODE_ENV=production

RUN mkdir -p .tmp public/uploads

EXPOSE 1340

CMD ["npm", "run", "start"]
