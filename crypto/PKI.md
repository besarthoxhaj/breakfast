## Public Key Infrastructure


```sh
# creates an RSA private key, it will be used to
# create the root certificate
$ openssl genrsa -out private.key.pem 2048
# creates the root certificate
$ openssl req -key private.key.pem -new -x509 -days 10 -out cert.pem
```

### Resources
- https://buildmedia.readthedocs.org/media/pdf/pki-tutorial/latest/pki-tutorial.pdf
- https://smallstep.com/blog/everything-pki
- https://jamielinux.com/docs/openssl-certificate-authority
