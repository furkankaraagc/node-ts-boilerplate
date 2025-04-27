#!/bin/bash

if ! command -v openssl &> /dev/null; then
    echo "OpenSSL is not installed, installing..."
    apk update && apk add --no-cache openssl
else
    echo "OpenSSL is already installed."
fi

CERT_DIR="/etc/ssl/certs"

KEY_FILE="$CERT_DIR/server.key"
CRT_FILE="$CERT_DIR/server.crt"

if [[ -f "$KEY_FILE" && -f "$CRT_FILE" ]]; then
    echo "SSL certificates already exist."
    exit 0
fi

mkdir -p $CERT_DIR

echo "Creating self-signed SSL certificate..."

openssl genpkey -algorithm RSA -out $KEY_FILE -pkeyopt rsa_keygen_bits:2048
openssl req -new -x509 -key $KEY_FILE -out $CRT_FILE -days 365 -subj "/C=TR/ST=Istanbul/L=Istanbul/O=My Local Company/OU=IT/CN=localhost/emailAddress=admin@localhost.com"

echo "Certificates created: $CRT_FILE and $KEY_FILE"
