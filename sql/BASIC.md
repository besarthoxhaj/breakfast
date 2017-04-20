## Basic

PostgreSQL follows a client-server architecture. To see how to start the server
and the possible arguments/options you can pass to it check:

```bash
$ postgres --help
# ...
# -D DATADIR         database directory
# ...
```

Look at the option `-D`. It specifies the database directory. That's where all
the configuration are saved. Let's try to run everything in the current folder:

```bash
$ mkdir server
$ postgres -D server

# postgres: could not access the server configuration file
# "/server/postgresql.conf": No such file or directory
```

Seems like `postgres` needs a configuration file, let's create an empty one.

```bash
$ touch server/postgresql.conf
```

Let's try again:

```bash
$ postgres -D server
# LOG: skipping missing configuration file "/server/postgresql.auto.conf"
# FATAL: data directory "/server" has group or world access
# DETAIL: Permissions should be u=rwx (0700).
```

Looks like someone is not happy about the directory `server` having world access.
We can double check that by running:

```bash
$ ls -l
# ...
# drwxr-xr-x  3 besartshyti  staff   102 21 Apr 10:07 server
# ...
```

The interesting part is at `drwxr-xr-x`. The first letter indicates that is a
directory. We can change it by using `chmod` (aka *change mode*).

```bash
$ chmod a-x,a-w,a-r server
$ ls -l
# ...
# d---------  3 besartshyti  staff   102 21 Apr 10:07 server
# ...
$ chmod u+x,u+w,u+r server
$ ls -l
# ...
# drwx------  3 besartshyti  staff   102 21 Apr 10:07 server
# ...
```

All good! Let's try again:

```bash
$ postgres -D server/
# LOG: skipping missing configuration file "/server/postgresql.auto.conf"
# FATAL: "/server" is not a valid data directory
# DETAIL: File "/server/PG_VERSION" is missing.
```

