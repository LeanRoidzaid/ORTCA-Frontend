FROM mysql
# Add a database
ENV MYSQL_DATABASE db_elaiss
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./db-init/ /docker-entrypoint-initdb.d/


FROM node:11-alpine

RUN mkdir -p /root/Documentos/WebApp/WebApp

WORKDIR /root/Documentos/WebApp/WebApp/


COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]