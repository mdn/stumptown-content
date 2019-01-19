PWD ?= $(shell pwd)

build:
	docker build -f docker/Dockerfile -t mdnwebdocs/stump:latest .

lint: build
	docker run --volume ${PWD}:/app --workdir /app mdnwebdocs/stump:latest ./scripts/lint.sh

validate: build
	docker run --volume ${PWD}:/app --workdir /app mdnwebdocs/stump:latest ./scripts/validate.py

# Those tasks don't have file targets
.PHONY: build lint validate
