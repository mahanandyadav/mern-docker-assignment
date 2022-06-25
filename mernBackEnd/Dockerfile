#18.4.0
FROM node:18.4.0
WORKDIR /server
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","run","start"]
#image name dockermern.azurecr.io/dockermernimage .