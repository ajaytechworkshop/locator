FROM node:latest
#Install Node JS in the alpine linux distribution
#RUN apk add --no-cache nodejs npm

#Work Directory
WORKDIR /app

#Copy the sourcecode into /app folder
COPY . /app

#Install the npm dependecies after copying the source code
RUN npm install

#Expose the applicaiton running port
EXPOSE 3000

#Execute the docker image in our app node is command to start the app
ENTRYPOINT ["node"]

#Arguements to the execute command
 CMD [ "app.js" ] 


