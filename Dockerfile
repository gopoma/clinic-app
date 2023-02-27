FROM wernight/phantomjs:2.1.1

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./src ./src

CMD [ "npm", "run", "start" ]