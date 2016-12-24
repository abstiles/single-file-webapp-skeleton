.PHONY: clean docker-image webpack

PROJECT:=webapp
BUILD_DIR:=${PROJECT}/build
DOCKER_WORKDIR:=/usr/local/${PROJECT}

clean:
	rm -rf "${BUILD_DIR}" "${PROJECT}"/node_modules

docker-image: ${BUILD_DIR}/docker_image

${BUILD_DIR}/docker_image: Dockerfile ${PROJECT}/package.json | ${BUILD_DIR}
	docker build -t abstiles/${PROJECT} --rm .
	docker images -q abstiles/${PROJECT} > "$@"

${BUILD_DIR}:
	mkdir ${BUILD_DIR}

webpack: ${BUILD_DIR}/index.html

${BUILD_DIR}/index.html: docker-image ${PROJECT}/src/*
	docker run -it --rm \
		-v "$(abspath ${PROJECT}):${DOCKER_WORKDIR}/project:Z" \
		-w ${DOCKER_WORKDIR}/project \
		abstiles/${PROJECT} \
		webpack
