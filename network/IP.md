## Internet Protocol (IP)

### Classful network

### Classless Inter-Domain Routing (CIDR)

### Casting

- Unicast
- Broadcast
- Limited broadcasting
> When one host wants to send a message to every other host in the network. This
  is done by setting IP address of the receiver of the message to all 1 bits.
  Resulting in the decimal format of `255.255.255.255`.

- Directed broadcasting
> Host in one network wants to send a message to all hosts in another network.
  This is done by setting the IP address bits to all 1 in the subnet part.

### Subnetwork

An IP network can be further divided into smaller networks.

- Subnet mask
- Routing table
- Variable-Length Subnet Masking (VLSM)

Every host in a network should have its own subnet mask in order to determine if
and IP address is inside or outside its own network.

### Supernetwork

[Video tutorial](https://goo.gl/DbIFjY)

- Rules
- How to determine continuity between to network IP addresses?

### Packet transfer delay

> [Transmission delay](https://goo.gl/ns6Zw7) is defined as the time taken to
  transmit a packet from an host to an outgoing link.
  It is directly proportional to the data to be send and inversely proportional
  to the bandwidth available.

Remember that bandwidth is a frequency and it is usually represented in decimal,
while this is not the case for data which is represented in bits and is usually
in power of 2.

> [Propagation delay](https://goo.gl/lfZXLJ) is defined as the time for a bit
  of a message to cross the wire and reach the other network node.
  It is directly proportional to the distance between the nodes and inversely
  proportional to the speed.

> [Queuing delay](https://goo.gl/49MMFg) is defined as the time 

> [Network throughput](https://en.wikipedia.org/wiki/Throughput) also called
  effective bandwidth or bandwidth utilization.

> [Round-trip delay time](https://goo.gl/8K0Jnp)

### Flow control

[Video tutorial](https://goo.gl/2814xu)

In order to increase efficiency and prevent the sender to sent too many packets
to a receiver, to the limit where the last would fill up its buffer and start to
drop packets, it's implemented a [closed loop control mechanism](https://goo.gl/kp0NtG).

> [Automatic repeat request (ARQ)](https://goo.gl/lwuyr6)

> [Stop and wait automatic repeat-request (ARQ)](https://goo.gl/Yb6Fc7)

> [Sliding window protocol](https://goo.gl/wgwKAs)

### Links and Access Control

[Video tutorial](https://goo.gl/xl2BW4)

> [Telecommunications link](https://goo.gl/waLmjV)

> [Time Division Multiplexing (TDM)](https://goo.gl/fIuI9D)

> [Pooling]() is introduced in order to remove *reservation* in TDM.
  The tradeoff is that we introduce a constant pooling time in between
  transmission + propagation time.

> [Carrier sense multiple access with collision detection (CSMA/CD)](https://goo.gl/qnR4sZ)


> [Token passing](https://goo.gl/itQEkn)

### Resources

