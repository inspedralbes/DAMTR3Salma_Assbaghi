FROM node:18

WORKDIR /app

EXPOSE 4000                 

COPY package*.json .  

RUN npm install 

COPY . .     

CMD ["node", "app.js"]