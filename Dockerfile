FROM node:7.3.0

COPY webapp/package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /usr/local/webapp/tmp/node_modules /usr/local/webapp/
WORKDIR /usr/local/webapp
ENV NODE_PATH /usr/local/webapp/node_modules
ENV PATH /usr/local/webapp/node_modules/.bin:$PATH
