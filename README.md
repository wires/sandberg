# Setup

Install dependencies

	npm install

Then

	gulp

This will start a webserver with `./dist/` as it's document root and
with livereload script injection.

Every time you modify a file in `./src/` the page will live reload.

## HTTPS

to *Allow Always* teh camera, one needs HTTPS.

Create keypair `key.pem`, `cert.pem`

	mkdir ssl/
	openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout ssl/key.pem -out ssl/cert.pem


