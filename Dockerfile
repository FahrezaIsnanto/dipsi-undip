FROM node:alpine

#RUN apk add --no-cache python3 g++ make

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

#USER node

RUN npm ci

#COPY --chown=node:node . .

COPY . .

EXPOSE 8000

CMD [ "npm", "run","develop" ]
