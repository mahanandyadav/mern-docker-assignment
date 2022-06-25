#18.4.0
FROM node:18.4.0
WORKDIR /server
COPY package*.json /server
RUN npm install
COPY . /server
EXPOSE 5000
CMD ["node","index.js"]
#image name dockermern.azurecr.io/dockermernimage .