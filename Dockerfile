FROM node:22-alpine

WORKDIR /app

# Install dependencies first to leverage layer caching
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy app source
COPY index.html styles.css app.js server.js ./
COPY lib ./lib
COPY vendor ./vendor

RUN mkdir -p /app/data

ENV HOST=0.0.0.0
ENV PORT=4173

EXPOSE 4173

CMD ["node", "server.js"]
