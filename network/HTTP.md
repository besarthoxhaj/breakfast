## Hyper Text Transfer Protocol

Examples are run with `telnet` and a open connection to `www.google.co.uk 80`.

```sh
GET / HTTP/1.1
Host: www.google.co.uk

HTTP/1.1 200 OK
Date: Mon, 02 Jan 2017 15:50:46 GMT
Expires: -1
Cache-Control: private, max-age=0
Content-Type: text/html; charset=ISO-8859-1
P3P: CP="This is not a P3P policy! See https://www.google.com/support/accounts/answer/151657?hl=en for more info."
Server: gws
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
Set-Cookie: NID=93=TALfHDUKIfzFgFYXySkV6Bkgxz2Wd3_H7PLccYmRQby0s35RaYsDp6NNxI35LwYY47k6GsxZsTxy-- vnWgQ1aJXA49t3GxHeguvUZumPWRz0UB1KeB7UwWSxx5AHgty; expires=Tue, 04-Jul-2017 15:50:46 GMT; path=/; domain=.google.co.uk; HttpOnly
Transfer-Encoding: chunked
Accept-Ranges: none
Vary: Accept-Encoding
```

## Keep alive and reuse the same connection

```sh
HEAD / HTTP/1.1
Host: www.google.co.uk

[header reply by google server]

[notice how the connection is still active]

HEAD /favicon.ico HTTP/1.1
Host: www.google.co.uk
Connection: close

HTTP/1.1 200 OK
[...]
Connection: close

Connection closed by foreign host.
```

In this case the connection got closed.

## Headers

#### Cookies

Defined by the IETF on the [RFC 6265](https://goo.gl/kd0DaA) they are probably
one of the most used header filed on an HTTP request.

#### Third Party Cookies

## HTTP/2.0

Can use `telnet` for this job.

```sh

```

## Resources

- 