FROM node:8

MAINTAINER KuDenV McBrick

#ENV http_proxy http://proxy:8080
#ENV https_proxy https://proxy:8080

#RUN npm cache clean --force
#UN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set proxy http://proxy:8080
RUN npm config set https-proxy http://proxy:8080
RUN npm config set registry http://registry.npmjs.org/ 
RUN npm install webpack -g

RUN npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/ 

RUN cp -a /tmp/node_modules /usr/src/app/

#Define enviroment variable 
# NODE_ENV either development || production
ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_ENV=production 
ENV PORT=4000
EXPOSE 3000

CMD [ "/usr/local/bin/node", "./server.js" ]


