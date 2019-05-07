PWD ?= $(shell pwd)


clean:
	rm -fr .docker-build

build:
	docker build -f docker/Dockerfile -t mdnwebdocs/stump:latest .
	touch .docker-build

build-conditional:
	ls .docker-build || make build

lint: build-conditional
	docker run --volume ${PWD}:/app --workdir /app mdnwebdocs/stump:latest ./scripts/lint.sh

validate: build-conditional
	docker run --volume ${PWD}:/app --workdir /app mdnwebdocs/stump:latest ./scripts/validate.py

# Those tasks don't have file targets
.PHONY: clean build lint validate
