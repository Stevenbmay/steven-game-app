FROM node:17
WORKDIR /auth_expamle
COPY . .
RUN npm run build
RUN npm install --production
CMD ["node", "src/index.js"]
EXPOSE 3000