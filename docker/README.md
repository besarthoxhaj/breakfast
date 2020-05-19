## Docker

```sh
$ docker run hello-world
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
#
# To generate this message, Docker took the following steps:
#  1. The Docker client contacted the Docker daemon.
#  2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
#  3. The Docker daemon created a new container from that image which runs the
#     executable that produces the output you are currently reading.
#  4. The Docker daemon streamed that output to the Docker client, which sent it
#     to your terminal.
#
# To try something more ambitious, you can run an Ubuntu container with:
#  $ docker run -it ubuntu bash
#
# Share images, automate workflows, and more with a free Docker ID:
#  https://cloud.docker.com/
#
# For more examples and ideas, visit:
#  https://docs.docker.com/engine/userguide/
```

The command `docker run hello-world` may fail if docker engine is not working.

```sh
$ docker pull busybox
```

Or it may fail if you don't have hte right credentials:

```sh
$ docker run hello-world
#Unable to find image 'hello-world:latest' locally
# docker: Error response from daemon: Gethttps://registry-1.docker.io/v2/library/hello-world/manifests/latest: unauthorized: incorrect username or password.
# See 'docker run --help'.
```

## Install

Go to the docker website and download the free version. Once installed, the
`docker` command will be available:

```sh
$ docker --version
# Docker version 18.03.1-ce, build 9ee9f40
$ docker-compose --version
# docker-compose version 1.21.1, build 5a3f1a3
$ docker-machine --version
# docker-machine version 0.14.0, build 89b8332
```

## Quick start

## Swarm

## Examples

## Questions

- How do you install Docker on AWS?
- What's a docker engine?
- What does it main to run *natively*?
- What is a *discrete process*?

## Resources

- https://devopscube.com/what-is-docker/
- https://docs.docker.com/get-started
- https://stackoverflow.com/q/22272401
