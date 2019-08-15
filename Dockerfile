FROM node:latest

#Install Node JS in the alpine linux distribution
#RUN apk add --no-cache nodejs npm

#Create working directory
RUN mkdir -p /app

#Specify Work Directory
WORKDIR /app

#Copy the package.json  into working directory
COPY package*.json /app/

#Install the npm dependecies
RUN npm install

#Copy the sourcecode into /app folder
COPY . /app

#Expose the applicaiton running port
EXPOSE 3000

#Execute the docker image in our app node is command to start the app
ENTRYPOINT ["node"]

#Arguements to the execute command
 CMD [ "app.js" ] 


