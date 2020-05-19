```
$ docker build -t my_app_image .
$ docker run --publish 8080:80 --detach --name MyRunningApp my_app_image
$ docker container ls --all
$ docker container stop MyRunningApp
$ docker container prune
```