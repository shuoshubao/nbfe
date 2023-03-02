A fork of [upng-js@2.1.0](https://www.npmjs.com/package/upng-js/v/2.1.0)

```js
const { readFileSync, writeFileSync } = require('fs')
const { decode, encode, toRGBA8 } = require('@nbfe/upng-js')

const imgBuffer = readFileSync('1.png')

const img = decode(imgBuffer)
const rgba = toRGBA8(img)[0]
const { buffer: rgbaBuffer } = new Uint8Array(rgba)

const compressed = encode([rgbaBuffer], img.width, img.height, 256)

writeFileSync('2.png', Buffer.from(compressed))
```

# UPNG.js

> A small, fast and advanced PNG / APNG encoder and decoder. It is the main PNG engine for [Photopea image editor](https://www.photopea.com).
