## Debugging tools

### telnet

[Troubleshooting with Telnet](https://goo.gl/i74JF1)

```sh
$ telnet www.google.co.uk 80
GET / HTTP/1.1
Host: www.google.co.uk

```

Notice the important empty line at the end of the header.

```sh
$ telnet
telnet> open www.google.co.uk 80
Trying XXX.XXX.XXX.XXX...
Connected to www.google.co.uk.
Escape character is '^]'.
HEAD / HTTP/1.1
Host: www.google.co.uk

HTTP/1.1 200 OK
Date: Mon, 02 Jan 2017 15:32:03 GMT
Expires: -1
Cache-Control: private, max-age=0
Content-Type: text/html; charset=ISO-8859-1
P3P: CP="This is not a P3P policy! See https://www.google.com/support/accounts/answer/151657?hl=en for more info."
Server: gws
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
Set-Cookie: NID=93=p7mHZLBHlBsf28EZUBLaaQ4K9R4EayGprogI9WXoQ_tUWyTzAZo9MBuVves2pIsfOWkFszoXCNuUllUfstrAnv7VyMB9eaW1bKG7IR7KNwULPl4pLlf5HhbOpdX1JV8G; expires=Tue, 04-Jul-2017 15:32:03 GMT; path=/; domain=.google.co.uk; HttpOnly
Transfer-Encoding: chunked
Accept-Ranges: none
Vary: Accept-Encoding
```

### traceroute

> The Internet is a large and complex aggregation of network hardware, connected
  together by gateways. Tracking the route one's packets follow (or finding the
  miscreant gateway that's discarding your packets) can be difficult.
  `traceroute` utilizes the IP protocol `time to live` field and attempts to
  elicit an ICMP TIME_EXCEEDED response from each gate-way along the path to
  some host.

It works by leveraging the TTL filed on an IP datagram. Indeed when an IP TTL
reaches zero it should be destroyed and an ICMP time exceeded message to the
source IP of the datagram.

Since the ICMP message will be wrapped in an IP datagram it will be possible to
see the IP address of who is sending the time exceeded message and so to locate
a gateway.

To see more details run `man traceroute`.

```sh
$ traceroute -w 3 -q 1 -m 16 example.com
traceroute to example.com (93.184.216.34), 16 hops max, 52 byte packets
 1  *
 2  hari-core-2a-xe-820-0.network.virginmedia.net (82.2.243.13)  29.897 ms
 3  *
 4  *
 5  brnt-ic-1-ae0-0.network.virginmedia.net (62.254.42.198)  39.802 ms
 6  m686-mp2.cvx1-b.lis.dial.ntli.net (62.254.42.174)  20.679 ms
 7  *
 8  84.116.136.102 (84.116.136.102)  41.469 ms
 9  ae-11.r24.londen12.uk.bb.gin.ntt.net (195.66.224.138)  19.194 ms
10  ae-5.r24.nycmny01.us.bb.gin.ntt.net (129.250.2.18)  150.687 ms
11  ae-1.r07.nycmny01.us.bb.gin.ntt.net (129.250.3.181)  132.095 ms
12  ae-0.edgecast-networks.nycmny01.us.bb.gin.ntt.net (129.250.196.174)  121.880 ms
13  93.184.216.34 (93.184.216.34)  118.037 ms
```

Where each operatin arguments stands for:
- `-w` wait expressed in seconds
- `-q` number of queries for each hop
- `-m` limit the maximum number of hops

### dig

Acronym for domain information groper.

The general command format is `dig @server name type`.

```sh
$ dig @a.root-servers.net google.co.uk

; <<>> DiG 9.8.3-P1 <<>> @a.root-servers.net google.co.uk
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 11840
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 8, ADDITIONAL: 13
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;google.co.uk.			IN	A

;; AUTHORITY SECTION:
uk.			172800	IN	NS	dns1.nic.uk.
uk.			172800	IN	NS	dns4.nic.uk.
uk.			172800	IN	NS	nsa.nic.uk.
uk.			172800	IN	NS	nsd.nic.uk.
uk.			172800	IN	NS	nsc.nic.uk.
uk.			172800	IN	NS	nsb.nic.uk.
uk.			172800	IN	NS	dns3.nic.uk.
uk.			172800	IN	NS	dns2.nic.uk.

;; ADDITIONAL SECTION:
dns1.nic.uk.		172800	IN	A	213.248.216.1
dns1.nic.uk.		172800	IN	AAAA	2a01:618:400::1
dns4.nic.uk.		172800	IN	A	43.230.48.1
dns4.nic.uk.		172800	IN	AAAA	2401:fd80:404::1
nsa.nic.uk.		 172800	IN	A	156.154.100.3
nsa.nic.uk.		 172800	IN	AAAA	2001:502:ad09::3
nsd.nic.uk.		 172800	IN	A	156.154.103.3
nsc.nic.uk.		 172800	IN	A	156.154.102.3
nsb.nic.uk.		 172800	IN	A	156.154.101.3
dns3.nic.uk.		172800	IN	A	213.248.220.1
dns3.nic.uk.		172800	IN	AAAA	2a01:618:404::1
dns2.nic.uk.		172800	IN	A	103.49.80.1
dns2.nic.uk.		172800	IN	AAAA	2401:fd80:400::1

;; Query time: 153 msec
;; SERVER: 198.41.0.4#53(198.41.0.4)
;; WHEN: Sun Jan  1 17:36:04 2017
;; MSG SIZE  rcvd: 450
```

Note the different sections like `QUESTION SECTION` and `AUTHORITY SECTION`. By
repeating the query to one of the other TLD servers.

```sh
$ dig @nsa.nic.uk google.co.uk A

; <<>> DiG 9.8.3-P1 <<>> @nsa.nic.uk google.co.uk A
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 37507
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 4, ADDITIONAL: 0
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;google.co.uk.			IN	A

;; AUTHORITY SECTION:
google.co.uk.		172800	IN	NS	ns1.google.com.
google.co.uk.		172800	IN	NS	ns2.google.com.
google.co.uk.		172800	IN	NS	ns4.google.com.
google.co.uk.		172800	IN	NS	ns3.google.com.

;; Query time: 63 msec
;; SERVER: 156.154.100.3#53(156.154.100.3)
;; WHEN: Sun Jan  1 17:39:43 2017
;; MSG SIZE  rcvd: 112
```

Close, the last query should give the result.

```sh
$ dig @ns1.google.com google.co.uk A

; <<>> DiG 9.8.3-P1 <<>> @ns1.google.com google.co.uk A
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 64460
;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;google.co.uk.			IN	A

;; ANSWER SECTION:
google.co.uk.		300	IN	A	216.58.198.163

;; Query time: 531 msec
;; SERVER: 216.239.32.10#53(216.239.32.10)
;; WHEN: Sun Jan  1 17:41:35 2017
;; MSG SIZE  rcvd: 46
```

There we have the result under `ANSWER SECTION` which is `216.58.198.163`.

## wireshark

```sh
tcp.port == 443 && ssl && (ip.dst == 93.184.216.34 || ip.dst == 192.168.0.9) && (ip.src == 93.184.216.34 || ip.src == 192.168.0.9)
```

The IP address above `93.184.216.34` belongs to `https://example.com/`. The filter
will look only for TLS records between the local host and the remote server.

## netstat

```sh
$ netstat -a
```

- `-a` show the state of all sockets
- `-s` show statistics for each protocol (tcp, udp, ip, etc.)
- `-p` show it only for one protocol e.g. `netstat -sp tcp`

## sysctl

## curl

