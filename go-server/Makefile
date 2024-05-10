prefix ?= /usr

VERSION = $(shell git describe --always --long --dirty --tags)
LDFLAGS = "-X pulwar.isi.edu/sabres/webpage/react/coreui/go-server/common.Version=$(VERSION)"

all: build/service

build/service: main.go | build
	        go build -ldflags=$(LDFLAGS) -o $@ $<

build:
	        mkdir -p build

clean:
	        rm -rf build
