FROM node:20-bullseye
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
# CMD ["npm", "run" "dev_docker"] DEFINED IN docker-compose.yml