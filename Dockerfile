FROM node:8-alpine

WORKDIR /srv
# [omitted] git clone, npm install etc....

ENV PHANTOMJS_VERSION=2.1.1
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN apk update && apk add --no-cache fontconfig curl curl-dev && \
    cd /tmp && curl -Ls https://github.com/dustinblackman/phantomized/releases/download/${PHANTOMJS_VERSION}/dockerized-phantomjs.tar.gz | tar xz && \
    cp -R lib lib64 / && \
    cp -R usr/lib/x86_64-linux-gnu /usr/lib && \
    cp -R usr/share /usr/share && \
    cp -R etc/fonts /etc && \
    curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2 | tar -jxf - && \
    cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs

COPY package.json package-lock.json ./
RUN npm install phantomjs-prebuilt --s
RUN npm install -g html-pdf
RUN npm install
RUN chmod -R a+rwx /srv
RUN apk --update add ttf-ubuntu-font-family fontconfig && rm -rf /var/cache/apk/*
COPY . ./
VOLUME /srv
USER node



EXPOSE 3000
CMD ["node", "index.js"]