FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY index.html styles.css app.js server.js ./
RUN mkdir -p /app/data

ENV HOST=0.0.0.0
ENV PORT=4173

EXPOSE 4173

CMD ["node", "server.js"]
