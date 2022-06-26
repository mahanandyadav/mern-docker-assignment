FROM node:18.4.0
WORKDIR /usr/src/backend
COPY package*.json .
RUN npm ci
COPY . .
CMD [ "npm", "start" ]
