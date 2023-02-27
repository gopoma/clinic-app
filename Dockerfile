FROM ubuntu:latest

WORKDIR /app

RUN su -
RUN  apt-get update
RUN apt-get install sudo -y
RUN sudo apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_17.x -o nodesource_setup.sh
RUN sudo bash nodesource_setup.sh
RUN sudo apt install nodejs -y 
RUN sudo apt-get install -y fontconfig
RUN sudo apt-get install -y libfontconfig

COPY package*.json .

# Reference [https://github.com/Medium/phantomjs#linux-note][1]
RUN sudo npm set strict-ssl false
RUN sudo npm install 
RUN sudo npm install -g phantomjs-prebuilt 
RUN sudo npm install -g html-pdf 

COPY ./src ./src