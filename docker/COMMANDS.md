## Commands

Three main commands:

```sh
$ [ctrl + d]                             # exit container
$ docker build .                         # build current Dockerfile
$ docker image ls                        # list images
$ docker image rm {IMAGE}                # remove a specific image
$ docker image prune                     # prune not used images
$ docker image pull                      # pull an image or a repository from a registry
$ docker run {IMAGE}                     # run image or create a container
$ docker container ls                    # list running containers
$ docker container ls --all              # list all containers
$ docker container stop {CONTAINER}      # stop container
$ docker exec -it {CONTAINER} /bin/bash  # run a bash terminal in the container
```

## Run containers

```sh
$ docker container run -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=bar -d postgres
# -p, --publish list                   Publish a container's port(s) to the host
# -e, --env list                       Set environment variables
# -d, --detach                         Run container in background and print container ID
```

```sh
$ docker exec -it {CONTAINER} /bin/bash
# -i, --interactive          Keep STDIN open even if not attached
# -t, --tty                  Allocate a pseudo-TTY
```
