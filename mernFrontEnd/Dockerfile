FROM node:18.4.0
WORKDIR /usr/src/frontend
COPY package*.json .
RUN npm ci
COPY . .
CMD [ "npm", "start" ]
