## Networking

## HTTP

Is based on TCP/IP.

## HTTPS

## HTTP/1.0 vs HTTP/1.1

http://www8.org/w8-papers/5c-protocols/key/key.html

## Tools

`ifconfig` TCP/IP configuration

`ping` check connectivity

`arp` view and manage ARP cache

`traceroute` view the entire path a packet takes to get from one device to another

`dig` troubleshoot DNS name resolution. It uses the operating system DNS resolver library.

`netstat` display TCP/IP statistics and connections

```sh
$ host -v 216.58.204.33
Trying "33.204.58.216.in-addr.arpa"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45795
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;33.204.58.216.in-addr.arpa.	IN	PTR

;; ANSWER SECTION:
33.204.58.216.in-addr.arpa. 74905 IN	PTR	lhr25s12-in-f1.1e100.net.

Received 82 bytes from 194.168.4.100#53 in 26 ms
```

`telnet`

`wireshark`

`fuser` a command line tool to identify processes using files or sockets.

## Transmission Control Protocol (TCP)

## Internet Protocol (IP)

## Domain Name System (DNS)

There are 632 [`root name servers`](https://en.wikipedia.org/wiki/Root_name_server) as of 25 October 2016.
They are divided in 13 groups and they are the first layer which will be hit by our request.
The root server will point to a Top Layer Domain (TLD) server, in the case of `google.com` is `.com`.

The last layer 3 is also called `authoritative` servers.

DNS class

iterative vs recursive queries

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

## Questions


## Resources

- [Networking Tutorials for Beginners by devGeeK](https://www.youtube.com/watch?v=xpXhudbsrr8)
- [Networking Tutorial](https://www.youtube.com/playlist?list=PLowKtXNTBypH19whXTVoG3oKSuOcw_XeW)
- [Computer Networks](https://www.youtube.com/playlist?list=PLEbnTDJUr_IegfoqO4iPnPYQui46QqT0j)
- [Slow Loris Attack](https://youtu.be/XiFkyR35v2Y)
- [Hacking DNS](https://www.youtube.com/watch?v=zRysni9ND2w)
- [DNSCurve: Usable security for DNS](https://dnscurve.org/forgery.html)
- [Open Systems Interconnection model](https://en.wikipedia.org/wiki/OSI_model)
- [Computer Systems Security by MIT](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-858-computer-systems-security-fall-2014/)

## Projects

- [Linux IP Networking](https://goo.gl/yL6RwQ)
- [The Ars guide to building a Linux router from scratch](https://goo.gl/ffON6v)