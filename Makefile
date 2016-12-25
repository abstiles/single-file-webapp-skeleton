.PHONY: clean docker-image webpack

PROJECT:=webapp
BUILD_DIR:=${PROJECT}/build
SRC_DIR:=${PROJECT}/src
DOCKER_WORKDIR:=/usr/local/${PROJECT}/project

all: docker-image webpack

clean:
	rm -rf "${BUILD_DIR}" "${PROJECT}"/node_modules

docker-image: ${BUILD_DIR}/docker_image

${BUILD_DIR}/docker_image: Dockerfile ${PROJECT}/package.json | ${BUILD_DIR}
	docker build -t localhost/${PROJECT} --rm .
	docker images -q localhost/${PROJECT} > "$@"

${BUILD_DIR}:
	mkdir -p ${BUILD_DIR}

webpack: ${BUILD_DIR}/index.html

${BUILD_DIR}/index.html: ${BUILD_DIR}/docker_image ${SRC_DIR} ${SRC_DIR}/*
	docker run -it --rm \
		-v "$(abspath ${PROJECT}):${DOCKER_WORKDIR}:Z" \
		-w ${DOCKER_WORKDIR} \
		$$(cat "${BUILD_DIR}/docker_image") \
		webpack
