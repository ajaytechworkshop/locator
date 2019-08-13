FROM alpine:latest
#Install Node JS in the alpine linux distribution
RUN apk add --no-cache nodejs npm

#Work Directory
WORKDIR /app

#Copy the sourcecode into /app folder
COPY . /app

#Install the npm dependecies after copying the source code
RUN npm install

#Expose the applicaiton running port
EXPOSE 3000

#Execute the docker image
ENTRYPOINT ["node"]
#Arguements to the execute command in this case arguement to node command
 CMD [ "app.js" ] 


