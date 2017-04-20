## Basic

PostgreSQL follows a client-server architecture. To see how to start the server
and the possible arguments/options you can pass to it check:

```
$ postgres --help
# ...
# -D DATADIR         database directory
# ...
```

Look at the option `-D`. It specifies the database directory. That's where all
the configuration are saved. Let's try to run everything in the current folder:

```
$ mkdir server
$ postgres -D server

# postgres: could not access the server configuration file
# "/server/postgresql.conf": No such file or directory
```

Seems like `postgres` needs a configuration file, let's create an empty one.

```
$ touch server/postgresql.conf
```