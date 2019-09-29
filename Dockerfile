FROM node:11-alpine

RUN mkdir -p /root/Documentos/WebApp/WebApp/

WORKDIR /root/Documentos/WebApp/WebApp/
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]