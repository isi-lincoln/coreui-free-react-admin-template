FROM golang:bullseye as build

RUN apt update && apt upgrade -qy
RUN apt install -y \
    build-essential \
    cmake \
    make \
    ca-certificates \
    protobuf-compiler \
    gcc \
    g++ \
    libboost-all-dev  \
    golang

COPY . /data
WORKDIR /data

RUN make

FROM ubuntu:22.04 as final

RUN apt update && apt install -qy \
    iproute2 \
    vim

COPY --from=build /data/build /usr/bin/

    
ENV UPSTREAM "172.22.2.1"
ENV HOST 0.0.0.0
ENV PORT 8001
ENV DEBUG   "true"
ENV GIN_MODE DEBUG

# orchestratorctld grpc
EXPOSE ${PORT}

CMD /usr/bin/service
