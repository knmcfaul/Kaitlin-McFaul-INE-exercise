# base node
FROM node:8.12

# working dir
RUN mkdir -p /ine-beers
WORKDIR /ine-beers

# copy app source
COPY . ./

# install dependencies
RUN npm install --quiet && npm run build

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]
