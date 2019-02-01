## Install

Using homebrew

```sh
$ brew install postgresql
```

Which will output the logs.

```
==> Installing dependencies for postgresql: icu4c, openssl and readline
==> Installing postgresql dependency: icu4c
==> Downloading https://homebrew.bintray.com/bottles/icu4c-63.1.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring icu4c-63.1.mojave.bottle.tar.gz
==> Caveats
icu4c is keg-only, which means it was not symlinked into /usr/local,
because macOS provides libicucore.dylib (but nothing else).

If you need to have icu4c first in your PATH run:
  echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.bash_profile
  echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.bash_profile

For compilers to find icu4c you may need to set:
  export LDFLAGS="-L/usr/local/opt/icu4c/lib"
  export CPPFLAGS="-I/usr/local/opt/icu4c/include"

==> Summary
🍺  /usr/local/Cellar/icu4c/63.1: 254 files, 68.4MB
==> Installing postgresql dependency: openssl
==> Downloading https://homebrew.bintray.com/bottles/openssl-1.0.2q.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring openssl-1.0.2q.mojave.bottle.tar.gz
==> Caveats
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

openssl is keg-only, which means it was not symlinked into /usr/local,
because Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries.

If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

==> Summary
🍺  /usr/local/Cellar/openssl/1.0.2q: 1,794 files, 12.1MB
==> Installing postgresql dependency: readline
==> Downloading https://homebrew.bintray.com/bottles/readline-8.0.0.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring readline-8.0.0.mojave.bottle.tar.gz
==> Caveats
readline is keg-only, which means it was not symlinked into /usr/local,
because macOS provides the BSD libedit library, which shadows libreadline.
In order to prevent conflicts when programs look for libreadline we are
defaulting this GNU Readline installation to keg-only.

For compilers to find readline you may need to set:
  export LDFLAGS="-L/usr/local/opt/readline/lib"
  export CPPFLAGS="-I/usr/local/opt/readline/include"

==> Summary
🍺  /usr/local/Cellar/readline/8.0.0: 48 files, 1.5MB
==> Installing postgresql
==> Downloading https://homebrew.bintray.com/bottles/postgresql-11.1_1.mojave.bottle.1.tar.gz
######################################################################## 100.0%
==> Pouring postgresql-11.1_1.mojave.bottle.1.tar.gz
==> /usr/local/Cellar/postgresql/11.1_1/bin/initdb /usr/local/var/postgres
==> Caveats
To migrate existing data from a previous major version of PostgreSQL run:
  brew postgresql-upgrade-database

To have launchd start postgresql now and restart at login:
  brew services start postgresql
Or, if you don't want/need a background service you can just run:
  pg_ctl -D /usr/local/var/postgres start
==> Summary
🍺  /usr/local/Cellar/postgresql/11.1_1: 3,548 files, 40.3MB
==> Caveats
==> icu4c
icu4c is keg-only, which means it was not symlinked into /usr/local,
because macOS provides libicucore.dylib (but nothing else).

If you need to have icu4c first in your PATH run:
  echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.bash_profile
  echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.bash_profile

For compilers to find icu4c you may need to set:
  export LDFLAGS="-L/usr/local/opt/icu4c/lib"
  export CPPFLAGS="-I/usr/local/opt/icu4c/include"

==> openssl
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

openssl is keg-only, which means it was not symlinked into /usr/local,
because Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries.

If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

==> readline
readline is keg-only, which means it was not symlinked into /usr/local,
because macOS provides the BSD libedit library, which shadows libreadline.
In order to prevent conflicts when programs look for libreadline we are
defaulting this GNU Readline installation to keg-only.

For compilers to find readline you may need to set:
  export LDFLAGS="-L/usr/local/opt/readline/lib"
  export CPPFLAGS="-I/usr/local/opt/readline/include"

==> postgresql
To migrate existing data from a previous major version of PostgreSQL run:
  brew postgresql-upgrade-database

To have launchd start postgresql now and restart at login:
  brew services start postgresql
Or, if you don't want/need a background service you can just run:
  pg_ctl -D /usr/local/var/postgres start
```

Let's follow the last suggestion and start postgres.

```
[sql]$ pg_ctl -D /usr/local/var/postgres start
waiting for server to start....2019-01-30 11:39:40.651 GMT [17258] LOG:  listening on IPv6 address "::1", port 5432
2019-01-30 11:39:40.651 GMT [17258] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2019-01-30 11:39:40.652 GMT [17258] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2019-01-30 11:39:40.669 GMT [17259] LOG:  database system was shut down at 2019-01-30 11:14:12 GMT
2019-01-30 11:39:40.675 GMT [17258] LOG:  database system is ready to accept connections
 done
server started
```

If you try to connect with `psql` you get this error.

```
[sql]$ psql
2019-01-30 11:41:15.166 GMT [17273] FATAL:  database "besartshyti" does not exist
psql: FATAL:  database "besartshyti" does not exist
```

Let's create a database.

```
[sql]$ initdb /usr/local/var/postgres
The files belonging to this database system will be owned by user "besartshyti".
This user must also own the server process.

The database cluster will be initialized with locale "en_GB.UTF-8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

initdb: directory "/usr/local/var/postgres" exists but is not empty
If you want to create a new database system, either remove or empty
the directory "/usr/local/var/postgres" or run initdb
with an argument other than "/usr/local/var/postgres".
```

Remove what's in `rm -r /usr/local/var/postgres` and run again initdb.

```
[sql]$ initdb /usr/local/var/postgres
The files belonging to this database system will be owned by user "besartshyti".
This user must also own the server process.

The database cluster will be initialized with locale "en_GB.UTF-8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

creating directory /usr/local/var/postgres ... ok
creating subdirectories ... ok
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting dynamic shared memory implementation ... posix
creating configuration files ... ok
running bootstrap script ... ok
performing post-bootstrap initialization ... ok
syncing data to disk ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run initdb.

Success. You can now start the database server using:

    pg_ctl -D /usr/local/var/postgres -l logfile start

```

```sh
$ psql
# psql: FATAL:  database "besartshyti" does not exist
$ createdb besartshyti
$ psql
```
