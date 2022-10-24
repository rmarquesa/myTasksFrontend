# build environment
FROM node:13.12.0-alpine as appbuild
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable
COPY --from=build /app/appbuild /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]