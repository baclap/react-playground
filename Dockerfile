FROM node:0.12.7

#color in terminal
ENV TERM xterm-256color

#expose app port
EXPOSE 4000

#ADD current directory for easy deployment
ADD ./ /app

#SET working directory
WORKDIR /app

#INSTALL NPM packages
RUN npm install

#Default container run command
CMD npm start