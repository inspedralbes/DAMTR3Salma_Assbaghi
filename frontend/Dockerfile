FROM node:18

WORKDIR /app

COPY nuxt-app/package*.json ./nuxt-app/

WORKDIR /app/nuxt-app
RUN npm install

COPY nuxt-app/ ./ 

EXPOSE 3000

CMD ["npm", "run", "dev"]
