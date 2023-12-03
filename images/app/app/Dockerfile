FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install --quiet

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]