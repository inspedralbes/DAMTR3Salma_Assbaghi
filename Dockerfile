FROM node:18

WORKDIR /frontend

EXPOSE 3000                 

COPY package*.json .  

RUN npm ci --only=production 

COPY . .     

CMD ["npm", "start", "dev"]        
