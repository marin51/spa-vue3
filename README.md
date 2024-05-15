# Vue 3 + TypeScript + Vite + Single-SPA

## Installation:

### Install needed dependencies

`npm install`

### Include certificates for local https server

Create a folder `certs` in the project root and generate certificates inside:

1. Use this command `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 3650` for generating ssl cert
2. Extract key with this command `openssl pkey -in key.pem -out server.key`

## Local Development:

### Run these commands

`npm run build-watch`
`npm run preview`

#### The app will be served on: https://localhost:8080/js/app.js

#### Pull this [root config orchestrator app](https://github.com/marin51/spa-root)

## Production build

`npm run build`

#### The bundled app will be at: dist/js/app.js
