FROM node:14-alpine

WORKDIR /work/

COPY package.json /work/package.json

RUN npm install

COPY . /work/

CMD node .