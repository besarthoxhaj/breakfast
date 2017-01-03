
#### Convert non-ASCII Unicode characters in hostname

- The browser checks the hostname for characters that are not in `a-z`,
  `A-Z`, `0-9`, `-`, or `.`.
- Since the hostname is `google.com` there won't be any, but if there were
  the browser would apply `Punycode` encoding to the hostname portion of
  the URL.

#### Check HSTS list

- The browser checks its "preloaded HSTS (HTTP Strict Transport Security)"
  list. This is a list of websites that have requested to be contacted via
  HTTPS only.
- If the website is in the list, the browser sends its request via HTTPS
  instead of HTTP. Otherwise, the initial request is sent via HTTP.
  (Note that a website can still use the HSTS policy *without* being in the
  HSTS list.  The first HTTP request to the website by a user will receive a
  response requesting that the user only send HTTPS requests.  However, this
  single HTTP request could potentially leave the user vulnerable to a
  `downgrade attack`, which is why the HSTS list is included in modern web
  browsers.)

#### Domain Name System (DNS) lookup

- Browser checks if the domain is in its cache. (to see the DNS Cache in
  Chrome, go to `chrome://net-internals/#dns <chrome://net-internals/#dns>`).
- If not found, the browser calls `gethostbyname` library function (varies by
  OS) to do the lookup. `gethostbyname` checks if the hostname can be resolved
  by reference in the local `hosts` file (whose location `varies by OS`) before
  trying to resolve the hostname through DNS.
* If `gethostbyname` does not have it cached nor can find it in the ``hosts``
  file then it makes a request to the DNS server configured in the network
  stack. This is typically the local router or the ISP's caching DNS server.
* If the DNS server is on the same subnet the network library follows the
  `ARP process` below for the DNS server.
* If the DNS server is on a different subnet, the network library follows
  the `ARP process` below for the default gateway IP.

#### Address Resolution Protocol (ARP)

In order to send an ARP (Address Resolution Protocol) broadcast the network
stack library needs the target IP address to look up. It also needs to know the
MAC address of the interface it will use to send out the ARP broadcast.

The ARP cache is first checked for an ARP entry for our target IP. If it is in
the cache, the library function returns the result: Target IP = MAC.

If the entry is not in the ARP cache:

- The route table is looked up, to see if the Target IP address is on any of
  the subnets on the local route table. If it is, the library uses the
  interface associated with that subnet. If it is not, the library uses the
  interface that has the subnet of our default gateway.

- The MAC address of the selected network interface is looked up.

- The network library sends a Layer 2 (data link layer of the `OSI model`)

Request:
```
Sender MAC: interface:mac:address:here
Sender IP: interface.ip.goes.here
Target MAC: FF:FF:FF:FF:FF:FF (Broadcast)
Target IP: target.ip.goes.here
```

Depending on what type of hardware is between the computer and the router:

Directly connected:

- If the computer is directly connected to the router the router responds
  with an `ARP Reply` (see below)

Hub:

- If the computer is connected to a hub, the hub will broadcast the ARP
  request out all other ports. If the router is connected on the same "wire",
  it will respond with an `ARP Reply` (see below).

Switch:

- If the computer is connected to a switch, the switch will check its local
  CAM/MAC table to see which port has the MAC address we are looking for. If
  the switch has no entry for the MAC address it will rebroadcast the ARP
  request to all other ports.

- If the switch has an entry in the MAC/CAM table it will send the ARP request
  to the port that has the MAC address we are looking for.

- If the router is on the same "wire", it will respond with an ARP Reply`
  (see below)

Reply:
```
Sender MAC: target:mac:address:here
Sender IP: target.ip.goes.here
Target MAC: interface:mac:address:here
Target IP: interface.ip.goes.here
```

Now that the network library has the IP address of either our DNS server or
the default gateway it can resume its DNS process:

- Port 53 is opened to send a UDP request to DNS server (if the response size
  is too large, TCP will be used instead).
- If the local/ISP DNS server does not have it, then a recursive search is
  requested and that flows up the list of DNS servers until the SOA is reached,
  and if found an answer is returned.

#### Opening of a socket

Once the browser receives the IP address of the destination server, it takes
that and the given port number from the URL (the HTTP protocol defaults to port
80, and HTTPS to port 443), and makes a call to the system library function
named `socket` and requests a TCP socket stream - `AF_INET/AF_INET6` and
`SOCK_STREAM`.

- This request is first passed to the Transport Layer where a TCP segment is
  crafted. The destination port is added to the header, and a source port is
  chosen from within the kernel's dynamic port range (ip_local_port_range in
  Linux).
- This segment is sent to the Network Layer, which wraps an additional IP
  header. The IP address of the destination server as well as that of the
  current machine is inserted to form a packet.
- The packet next arrives at the Link Layer. A frame header is added that
  includes the MAC address of the machine's NIC as well as the MAC address of
  the gateway (local router). As before, if the kernel does not know the MAC
  address of the gateway, it must broadcast an ARP query to find it.

At this point the packet is ready to be transmitted through either:

- `Ethernet`
- `WiFi`
- `Cellular data network`

For most home or small business Internet connections the packet will pass from
your computer, possibly through a local network, and then through a modem
(MOdulator/DEModulator) which converts digital 1's and 0's into an analog
signal suitable for transmission over telephone, cable, or wireless telephony
connections. On the other end of the connection is another modem which converts
the analog signal back into digital data to be processed by the next `network
node`_ where the from and to addresses would be analyzed further.

Most larger businesses and some newer residential connections will have fiber
or direct Ethernet connections in which case the data remains digital and
is passed directly to the next `network node` for processing.

Eventually, the packet will reach the router managing the local subnet. From
there, it will continue to travel to the autonomous system's (AS) border
routers, other ASes, and finally to the destination server. Each router along
the way extracts the destination address from the IP header and routes it to
the appropriate next hop. The time to live (TTL) field in the IP header is
decremented by one for each router that passes. The packet will be dropped if
the TTL field reaches zero or if the current router has no space in its queue
(perhaps due to network congestion).

This send and receive happens multiple times following the TCP connection flow:

- Client chooses an initial sequence number (ISN) and sends the packet to the
  server with the SYN bit set to indicate it is setting the ISN
- Server receives SYN and if it's in an agreeable mood:
   - Server chooses its own initial sequence number
   - Server sets SYN to indicate it is choosing its ISN
   - Server copies the (client ISN +1) to its ACK field and adds the ACK flag
     to indicate it is acknowledging receipt of the first packet
- Client acknowledges the connection by sending a packet:
   - Increases its own sequence number
   - Increases the receiver acknowledgment number
   - Sets ACK field
- Data is transferred as follows:
   - As one side sends N data bytes, it increases its SEQ by that number
   - When the other side acknowledges receipt of that packet (or a string of
     packets), it sends an ACK packet with the ACK value equal to the last
     received sequence from the other
- To close the connection:
   - The closer sends a FIN packet
   - The other sides ACKs the FIN packet and sends its own FIN
   - The closer acknowledges the other side's FIN with an ACK

#### TLS handshake

- The client computer sends a `ClientHello` message to the server with its
  Transport Layer Security (TLS) version, list of cipher algorithms and
  compression methods available.

- The server replies with a `ServerHello` message to the client with the
  TLS version, selected cipher, selected compression methods and the server's
  public certificate signed by a CA (Certificate Authority). The certificate
  contains a public key that will be used by the client to encrypt the rest of
  the handshake until a symmetric key can be agreed upon.

- The client verifies the server digital certificate against its list of
  trusted CAs. If trust can be established based on the CA, the client
  generates a string of pseudo-random bytes and encrypts this with the server's
  public key. These random bytes can be used to determine the symmetric key.

- The server decrypts the random bytes using its private key and uses these
  bytes to generate its own copy of the symmetric master key.

- The client sends a `Finished` message to the server, encrypting a hash of
  the transmission up to this point with the symmetric key.

- The server generates its own hash, and then decrypts the client-sent hash
  to verify that it matches. If it does, it sends its own `Finished` message
  to the client, also encrypted with the symmetric key.

- From now on the TLS session transmits the application (HTTP) data encrypted
  with the agreed symmetric key.

#### HTTP protocol

If the web browser used was written by Google, instead of sending an HTTP
request to retrieve the page, it will send a request to try and negotiate with
the server an "upgrade" from HTTP to the SPDY protocol.

If the client is using the HTTP protocol and does not support SPDY, it sends a
request to the server of the form::

```
GET / HTTP/1.1
Host: google.com
Connection: close
[other headers]
```

where `[other headers]` refers to a series of colon-separated key-value pairs
formatted as per the HTTP specification and separated by single new lines.
(This assumes the web browser being used doesn't have any bugs violating the
HTTP spec. This also assumes that the web browser is using `HTTP/1.1`,
otherwise it may not include the `Host` header in the request and the version
specified in the `GET` request will either be `HTTP/1.0` or `HTTP/0.9`.)

HTTP/1.1 defines the "close" connection option for the sender to signal that
the connection will be closed after completion of the response. For example,

```
Connection: close
```

HTTP/1.1 applications that do not support persistent connections MUST include
the "close" connection option in every message.

After sending the request and headers, the web browser sends a single blank
newline to the server indicating that the content of the request is done.

The server responds with a response code denoting the status of the request and
responds with a response of the form::

```
200 OK
[response headers]
```

Followed by a single newline, and then sends a payload of the HTML content of
`www.google.com`. The server may then either close the connection, or if
headers sent by the client requested it, keep the connection open to be reused
for further requests.

If the HTTP headers sent by the web browser included sufficient information for
the web server to determine if the version of the file cached by the web
browser has been unmodified since the last retrieval (ie. if the web browser
included an `ETag` header), it may instead respond with a request of
the form::

```
304 Not Modified
[response headers]
```

and no payload, and the web browser instead retrieves the HTML from its cache.

After parsing the HTML, the web browser (and server) repeats this process
for every resource (image, CSS, favicon.ico, etc) referenced by the HTML page,
except instead of `GET / HTTP/1.1` the request will be
`GET /$(URL relative to www.google.com) HTTP/1.1`.

If the HTML referenced a resource on a different domain than
`www.google.com`, the web browser goes back to the steps involved in
resolving the other domain, and follows all steps up to this point for that
domain. The `Host header in the request will be set to the appropriate
server name instead of `google.com`.

#### HTTP Server Request Handle


