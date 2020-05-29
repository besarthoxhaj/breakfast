## RSA

RSA, Rivest–Shamir–Adleman, is an asymmetric cryptographic algorithm. The
algorithm is based on the fact that finding the factors of a large composite
number is difficult: when the factors are prime numbers, the problem is called
prime factorization.

```sh
$ openssl genrsa -out private.pem 64
$ cat private.pem
# -----BEGIN RSA PRIVATE KEY-----
# MD8CAQACCQDhQzTVRwJsHwIDAQABAggUWf8OzmwbYQIFAPEzodECBQDvFTrvAgRR
# Q1QBAgUA1y86jQIFAItdOzY=
# -----END RSA PRIVATE KEY-----
```

RSA private key generation essentially involves the generation of two prime
numbers. When generating a private key various symbols will be output to
indicate the progress of the generation. An "." represents each number which
has passed an initial sieve test, + means a number has passed a single round
of the Miller-Rabin primality test. A newline means that the number has passed
all the prime tests (the actual number depends on the key size).

```sh
$ openssl rsa -in private.pem -text -noout | cat
# Private-Key: (64 bit)
# modulus: 16231875572597419039 (0xe14334d547026c1f)
# publicExponent: 65537 (0x10001)
# privateExponent: 1466483592743623521 (0x1459ff0ece6c1b61)
# prime1: 4046692817 (0xf133a1d1)
# prime2: 4011145967 (0xef153aef)
# exponent1: 1363366913 (0x51435401)
# exponent2: 3610196621 (0xd72f3a8d)
# coefficient: 2338143030 (0x8b5d3b36)
```

```sh
$ openssl rsa -in private.pem -out public.pem -pubout
$ cat public.pem
# -----BEGIN PUBLIC KEY-----
# MCQwDQYJKoZIhvcNAQEBBQADEwAwEAIJAOFDNNVHAmwfAgMBAAE=
# -----END PUBLIC KEY-----
```

```sh
$ openssl rsa -in public.pem -text -pubin -noout
# Public-Key: (64 bit)
# Modulus: 16231875572597419039 (0xe14334d547026c1f)
# Exponent: 65537 (0x10001)
```

### Resources
- https://simple.wikipedia.org/wiki/RSA_algorithm
- https://github.com/openssl/openssl/blob/master/apps/genrsa.c
- https://www.openssl.org/docs/man1.0.2/man1/genrsa.html
- https://www.openssl.org/docs/man1.0.2/man1/openssl-req.html
