### Table of Contents
- [Getting Started](#getting-started)
- [Developing](#developing)
- [Building](#building) 
- [Testing](#testing)
- [Samples](#samples) 
- [Consuming SDK](#consuming-sdk)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Kitchen Sink App](#kitchen-sink-app)
---

## Getting Started
With the Webex Contact Center, you can effo

TODO: Add the documentation links once ready
- [Introduction to the Webex Web Calling SDK]()
- [Quickstart guide]().
 
## Developing

```bash
git clone https://github.com/\<your-fork\>/webex-js-sdk.git
cd webex-js-sdk/
yarn install
```

## Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here:

```bash
yarn workspaces foreach --parallel --verbose run build:src

yarn build:local
```

## Testing

```bash
 yarn workspace @webex/contact-center run test
```

## Samples 
```bash
  yarn run samples:serve
```

## Consuming SDK
To consume the latest stable version of the Calling SDK one can use NPM or CDN.
# NPM
```javascript
  npm install @webex/contact-center
```
(or)

```javascript
  yarn add @webex/contact-center
```

```javascript
  import ContactCenter from '@webex/contact-center'
```
# CDN
```javascript
  <script src="../contact-center.min.js"></script>
```

### Kitchen Sink App
To test Contact Center SDK API, use this Kitchen Sink app: https://webex.github.io/webex-js-sdk/samples/contact-center/