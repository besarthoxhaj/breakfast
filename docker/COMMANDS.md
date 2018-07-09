## Commands

List of most used commands and what they do:

#### docker container ls - [docs](https://docs.docker.com/engine/reference/commandline/container_ls/)

A mirror to `ps` aka `process status`, used to check which containers are running.

```sh
$ docker container ls --help

# Usage: docker ps [OPTIONS]
#
# List containers
#
# Options:
#   -a, --all             Show all containers (default shows just running)
#   -f, --filter filter   Filter output based on conditions provided
#       --format string   Pretty-print containers using a Go template
#   -n, --last int        Show n last created containers (includes all states) (default -1)
#   -l, --latest          Show the latest created container (includes all states)
#       --no-trunc        Don't truncate output
#   -q, --quiet           Only display numeric IDs
#   -s, --size            Display total file sizes
```

When a container is running it will looks
```sh
$ docker container ls --help
# CONTAINER ID        IMAGE               COMMAND             CREATED                  STATUS              PORTS                  NAMES
# 3df7a925df27        bes                 "python app.py"     Less than a second ago   Up 3 seconds        0.0.0.0:3999->80/tcp   serene_feynman
```

#### docker build - [docs](https://docs.docker.com/engine/reference/commandline/build/)


```sh
$ docker build --help
# Usage: docker build [OPTIONS] PATH | URL | -
#
# Build an image from a Dockerfile
#
# Options:
#       --add-host list           Add a custom host-to-IP mapping (host:ip)
#       --build-arg list          Set build-time variables
#       --cache-from strings      Images to consider as cache sources
#       --cgroup-parent string    Optional parent cgroup for the container
#       --compress                Compress the build context using gzip
#       --cpu-period int          Limit the CPU CFS (Completely Fair Scheduler) period
#       --cpu-quota int           Limit the CPU CFS (Completely Fair Scheduler) quota
#   -c, --cpu-shares int          CPU shares (relative weight)
#       --cpuset-cpus string      CPUs in which to allow execution (0-3, 0,1)
#       --cpuset-mems string      MEMs in which to allow execution (0-3, 0,1)
#       --disable-content-trust   Skip image verification (default true)
#   -f, --file string             Name of the Dockerfile (Default is 'PATH/Dockerfile')
#       --force-rm                Always remove intermediate containers
#       --iidfile string          Write the image ID to the file
#       --isolation string        Container isolation technology
#       --label list              Set metadata for an image
#   -m, --memory bytes            Memory limit
#       --memory-swap bytes       Swap limit equal to memory plus swap: '-1' to enable unlimited swap
#       --network string          Set the networking mode for the RUN instructions during build (default "default")
#       --no-cache                Do not use cache when building the image
#       --pull                    Always attempt to pull a newer version of the image
#   -q, --quiet                   Suppress the build output and print image ID on success
#       --rm                      Remove intermediate containers after a successful build (default true)
#       --security-opt strings    Security options
#       --shm-size bytes          Size of /dev/shm
#   -t, --tag list                Name and optionally a tag in the 'name:tag' format
#       --target string           Set the target build stage to build.
#       --ulimit ulimit           Ulimit options (default [])
```

#### docker container run - [docs](https://docs.docker.com/engine/reference/commandline/container_run/)

#### docker tag - [docs](https://docs.docker.com/engine/reference/commandline/tag/)

```sh
$ docker tag --help
# Usage:	docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
#
# Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
#
# Options:
```
