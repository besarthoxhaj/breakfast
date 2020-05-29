## Code Signing



### Certificate Signing Requests

```sh
$ openssl genrsa -out private.pem 2048
$ cat private.pem
# -----BEGIN RSA PRIVATE KEY-----
# MIIEowIBAAKCAQEArTJPtMXVNpeqSCl2acDGS4trkn+FJzhw1vVrnCGkFPAeLtkt
# k2Fd3GxwkEUy4jUsAT5AIPKO6UPofjH5B28FHnMUYP9A2SO7FBfmOkx3dVnTd6vJ
# ... 21 lines
# tOA8ROekT5se4OEUANDy29vkieVDkk1io6nMvw55v+LcEWUa6iyYABd00KZHwEhe
# uIP5Ivuld10xPYW58RCgZaIhHj+dyEIdVpUSCE4vrVpfl6grP1Pf
# -----END RSA PRIVATE KEY-----
$ openssl rsa -in private.pem -text -noout | cat
# modulus         - n
# privateExponent - d
# publicExponent  - e
# prime1          - p
# prime2          - q
# exponent1       - d mod (p-1)
# exponent2       - d mod (q-1)
# coefficient     - (q^-1) mod p
$ openssl rsa -in private.pem -out public.pem -pubout
$ cat public.pem
# -----BEGIN PUBLIC KEY-----
# MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArTJPtMXVNpeqSCl2acDG
# ... 4 lines
# DsmIkIpSsPYqZFpw2CgJ2CAenI2axThA6wwTAwOh2MMuxJRFKmNaawlI0rGBdHl6
# TQIDAQAB
# -----END PUBLIC KEY-----
$ openssl rsa -in public.pem -text -pubin -noout
# Public-Key: (2048 bit)
# modulus           - n
# Exponent (public) - e
$ openssl req -new -key private.pem -out Autograph.csr -subj "/emailAddress=foo@bar.com, CN=Hello, C=GB"
$ cat Autograph.csr
# -----BEGIN CERTIFICATE REQUEST-----
# MIICcTCCAVkCAQAwLDEqMCgGCSqGSIb3DQEJARYbZm9vQGJhci5jb20sIENOPUhl
# bGxvLCBDPUdCMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArTJPtMXV
# ... 10 lines
# PMI22v78qlqCjGN1NLtcarqxwNYoFFohD4AhFShwZQT8eBPc+nDpZkIGiUM6rMih
# Z1oTZwA=
# -----END CERTIFICATE REQUEST-----
$ openssl asn1parse -i -in Autograph.csr
# 0:d=0  hl=4 l= 625 cons: SEQUENCE
# 4:d=1  hl=4 l= 345 cons:  SEQUENCE
# 8:d=2  hl=2 l=   1 prim:   INTEGER           :00
# 11:d=2  hl=2 l=  44 cons:   SEQUENCE
# 13:d=3  hl=2 l=  42 cons:    SET
# 15:d=4  hl=2 l=  40 cons:     SEQUENCE
# 17:d=5  hl=2 l=   9 prim:      OBJECT            :emailAddress
# 28:d=5  hl=2 l=  27 prim:      IA5STRING         :foo@bar.com, CN=Hello, C=GB
# 57:d=2  hl=4 l= 290 cons:   SEQUENCE
# 61:d=3  hl=2 l=  13 cons:    SEQUENCE
# 63:d=4  hl=2 l=   9 prim:     OBJECT            :rsaEncryption
# 74:d=4  hl=2 l=   0 prim:     NULL
# 76:d=3  hl=4 l= 271 prim:    BIT STRING
# 351:d=2  hl=2 l=   0 cons:   cont [ 0 ]
# 353:d=1  hl=2 l=  13 cons:  SEQUENCE
# 355:d=2  hl=2 l=   9 prim:   OBJECT            :sha256WithRSAEncryption
# 366:d=2  hl=2 l=   0 prim:   NULL
# 368:d=1  hl=4 l= 257 prim:  BIT STRING
$ openssl req -in Autograph.csr -text -noout
# Certificate Request:
#     Data:
#         Version: 0 (0x0)
#         Subject: emailAddress=foo@bar.com, CN=Hello, C=GB
#         Subject Public Key Info:
#             Public Key Algorithm: rsaEncryption
#                 Public-Key: (2048 bit)
#                 Modulus:   - n
#                 Exponent:  - e
#         Attributes:
#             a0:00
#     Signature Algorithm: sha256WithRSAEncryption
#          49:48:72:42:00:14:72:24:63:0c:1b:b7:46:85:96:96:34:58:
#          b4:a4:eb:bf:0c:ce:77:22:a8:dd:ae:a9:8c:bb:ef:de:55:e8:
#          c3:0b:e5:4c:ff:e1:1a:4b:01:f1:af:a1:09:8f:08:98:0f:54:
#          98:33:24:70:52:cc:e7:90:75:7f:97:a2:26:ae:01:71:ef:b1:
#          f4:fb:8d:5c:0f:16:36:9f:90:50:f6:fd:62:37:25:cb:ac:48:
#          bf:2e:8b:ad:5a:61:bc:85:7c:60:69:6d:74:ac:33:c6:3d:3b:
#          37:19:57:e3:14:25:31:21:b7:4c:11:5b:6e:53:2e:90:d5:a8:
#          59:72:11:f8:7e:ba:73:2c:90:a0:f4:39:5b:41:c7:fb:01:12:
#          4b:12:82:cb:7f:99:81:82:eb:f7:ae:8d:b0:ea:86:c4:69:32:
#          1f:68:0e:dd:0e:2c:93:8a:4f:71:ce:fe:09:8d:af:64:33:1e:
#          87:a0:b1:5f:9f:a8:50:c2:61:21:37:b4:71:17:14:18:71:fb:
#          cf:9b:2d:69:34:3c:c2:36:da:fe:fc:aa:5a:82:8c:63:75:34:
#          bb:5c:6a:ba:b1:c0:d6:28:14:5a:21:0f:80:21:15:28:70:65:
#          04:fc:78:13:dc:fa:70:e9:66:42:06:89:43:3a:ac:c8:a1:67:
#          5a:13:67:00
$ security find-identity -v -p codesigning
$ openssl x509 -in ios_development.cer -inform DER -text -noout
```


### Resources
- https://developer.apple.com/library/archive/documentation/Security/Conceptual/Security_Overview/Introduction/Introduction.html#//apple_ref/doc/uid/TP30000976
- https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005929-CH1-SW1
- http://shashikantjagtap.net/ios-code-signing-1-getting-started
- https://www.openssl.org/docs/man1.0.2/man1/genrsa.html
- https://en.wikipedia.org/wiki/PKCS_12


### Todo