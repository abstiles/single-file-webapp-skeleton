# Single-file Webapp Skeleton

[![CircleCI](https://img.shields.io/circleci/project/github/abstiles/single-file-webapp-skeleton.svg)](https://circleci.com/gh/abstiles/single-file-webapp-skeleton)

A skeleton for a single-file webapp project, including a basic Docker
configuration for development.

# Build Dependencies

The Node infrastructure (more specifically, `npm`) is required for building
this project. Dependencies can be installed from the `package.json` definitions
with:

    $ cd webapp
    $ npm install

From there, executing `webpack` within the `webapp` directory will build the
HTML file as `index.html` inside the `build` directory.

To avoid installing the Node infrastructure and all dependencies locally, use
the supplied Dockerfile to create a container with all dependencies defined
within `package.json`. This container is capable of building the `index.html`
file with the `webapp` command.
