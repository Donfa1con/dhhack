FROM node:10
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build
EXPOSE 80
EXPOSE 443

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
