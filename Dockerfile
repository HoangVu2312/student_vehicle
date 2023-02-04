# build image dựa trên image của node
FROM node:18

# Tạo một working directory bên trong immage để chứa code của ứng dụng
WORKDIR /app

# copy toàn bộ code của ứng dụng vào bên trong working direrctory
COPY . /app

# Thực thi mottj câu lệnh trong working directory
RUN npm install

EXPOSE 3005

CMD ["node", "app/server.js"]
