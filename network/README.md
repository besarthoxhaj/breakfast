## Networking

## Transmission Control Protocol

## Internet Protocol

## DNS

## SSL certificates

```sh
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

## DNS Spoofing

Is the practice of changing the local computer or network DNS host credentials `sudo vim /etc/hosts`.

```sh
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##

127.0.0.1       localhost
255.255.255.255 broadcasthost
::1             localhost

##
# Here we resolve the DNS ...
##

192.168.0.18    facebook.com www.facebook.com
```

## HTTP Strict Transport Security

Abbreviated as HSTS, was first presented in 2009 and adopted in 2012. It describes the process by which the first time a browser visit a website (only over HTTPS) the server will include in the header:

```sh
Strict-Transport-Security: max-age=16070400; includeSubDomains
```

this will instruct the browser to always contact the website over HTTPS for the length of the duration in seconds.

## Resources

- [Slow Loris Attack](https://youtu.be/XiFkyR35v2Y)
- [Hacking DNS](https://www.youtube.com/watch?v=zRysni9ND2w)
- [DNSCurve: Usable security for DNS](https://dnscurve.org/forgery.html)
- [Open Systems Interconnection model](https://en.wikipedia.org/wiki/OSI_model)