.PHONY: docker-image webpack

SUM := sha256sum

docker-image: webapp/build/docker_image

webapp/build/docker_image: Dockerfile webapp/package.json | webapp/build
	docker build -t abstiles/webapp --rm .
	docker images -q abstiles/webapp > "$@"

webapp/build:
	mkdir webapp/build

webpack: webapp/build/index.html

webapp/build/index.html: webapp/src/*
	docker run -it --rm -v $(pwd)/webapp:/usr/local/webapp/project:Z -w /usr/local/webapp/project abstiles/webapp webpack
