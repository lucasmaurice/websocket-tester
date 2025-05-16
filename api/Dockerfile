FROM node:8

COPY . /code
WORKDIR /code

ADD package.json .

RUN npm install forever -g
RUN npm install

CMD ["forever", "src/index.js"]
