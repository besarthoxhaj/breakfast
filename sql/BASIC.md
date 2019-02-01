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

What's `postgresql.conf` and why we need one? Seems like `postgres` needs a
configuration file, let's create an empty one.

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

To remove all permissions we can run `chmod a-x,a-w,a-r server`, where `a-x`
means for all groups remove execute permission and the same for `w` (write) and
`r` (read).

To know more about chomd read this [simple tutorial](https://goo.gl/nWnhDa).

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

What's that? Let's check how the default one looks like:

```bash
$ ls -l /usr/local/var/postgres/
# -rw-------   1 besartshyti  admin      4 Apr 21 08:05 PG_VERSION
# drwx------   5 besartshyti  admin    170 Apr 21 08:05 base
# drwx------  56 besartshyti  admin   1904 Apr 21 08:05 global
# drwx------   3 besartshyti  admin    102 Apr 21 08:05 pg_clog
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_commit_ts
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_dynshmem
# -rw-------   1 besartshyti  admin   4477 Apr 21 08:05 pg_hba.conf
# -rw-------   1 besartshyti  admin   1636 Apr 21 08:05 pg_ident.conf
# drwx------   4 besartshyti  admin    136 Apr 21 08:05 pg_logical
# drwx------   4 besartshyti  admin    136 Apr 21 08:05 pg_multixact
# drwx------   3 besartshyti  admin    102 Apr 21 08:05 pg_notify
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_replslot
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_serial
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_snapshots
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_stat
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_stat_tmp
# drwx------   3 besartshyti  admin    102 Apr 21 08:05 pg_subtrans
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_tblspc
# drwx------   2 besartshyti  admin     68 Apr 21 08:05 pg_twophase
# drwx------   4 besartshyti  admin    136 Apr 21 08:05 pg_xlog
# -rw-------   1 besartshyti  admin     88 Apr 21 08:05 postgresql.auto.conf
# -rw-------   1 besartshyti  admin  22230 Apr 21 08:05 postgresql.conf
```

There it is!

```bash
$ cat /usr/local/var/postgres/PG_VERSION
# 9.6
$ echo '11' >> PG_VERSION
```

Next try:

```bash
$ postgres -D server/
# LOG:  skipping missing configuration file "/server/postgresql.auto.conf"
# postgres: could not find the database system
# Expected to find it in the directory "/server",
# but could not open file "/server/global/pg_control": No such file or directory
```

What's `pg_control` and why we need one? Not really sure but let's create an empty
file and keep going.

```bash
$ mkdir server/global && touch server/global/pg_control
$ postgres -D server
# 2019-01-31 22:40:11.819 GMT [31448] LOG:  skipping missing configuration file "/Users/besartshyti/Projects/breakfast/sql/server/postgresql.auto.conf"
# 2019-01-31 22:40:11.825 GMT [31448] PANIC:  could not read from control file: read 0 bytes, expected 288
# Abort trap: 6
```
