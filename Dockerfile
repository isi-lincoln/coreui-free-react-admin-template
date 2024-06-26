FROM node:bullseye

RUN apt update && apt upgrade -qy
RUN apt install -qy vim-nox

RUN npm install -g create-react-app \
                   create-react-native-app \
                   react-native-cli \
		   react-scripts

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE 10000

CMD ["/bin/bash", "start.sh"]
