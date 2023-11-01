FROM node:20.9.0

# set working directory
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# start app
CMD ["npm", "run", "dev"]