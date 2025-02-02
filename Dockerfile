FROM node:18

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm config set store-dir /app/.pnpm-store

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm add -D typescript ts-node

RUN pnpm add -D nodemon

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "src/server.ts"]
