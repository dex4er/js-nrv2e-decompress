# nrv2e-decompress

<!-- markdownlint-disable MD013 -->

[![GitHub](https://img.shields.io/github/v/release/dex4er/js-nvr2e-decompress?display_name=tag&sort=semver)](https://github.com/dex4er/js-nvr2e-decompress)
[![CI](https://github.com/dex4er/js-nvr2e-decompress/actions/workflows/ci.yaml/badge.svg)](https://github.com/dex4er/js-nvr2e-decompress/actions/workflows/ci.yaml)
[![Trunk Check](https://github.com/dex4er/js-nvr2e-decompress/actions/workflows/trunk.yaml/badge.svg)](https://github.com/dex4er/js-nvr2e-decompress/actions/workflows/trunk.yaml)
[![Coverage Status](https://coveralls.io/repos/github/dex4er/js-nvr2e-decompress/badge.svg)](https://coveralls.io/github/dex4er/js-nvr2e-decompress)
[![npm](https://img.shields.io/npm/v/nvr2e-decompress.svg)](https://www.npmjs.com/package/nvr2e-decompress)

<!-- markdownlint-enable MD013 -->

Decompress with NRV2E algorithm.

## Requirements

This is ESM module which requires ES2020 and Node >= 14.

## Installation

```shell
npm install nrv2e-decompress
```

_Additionally for Typescript:_

```shell
npm install -D @types/node
```

## Usage

```js
import nrv2eDecompress from "nrv2e-decompress"
```

### nrv2eDecompress

```js
nrv2eDecompress(input, output, bufferBits)
```

_Arguments:_

- `input` is a `Buffer` with compressed data
- `output` is a `Buffer` from decompressed data and it have to be pre-allocated,
  ie. with `Buffer.alloc` method
- `bufferBits` is a number of control buffer bits: `8`, `16` or `32` (optional:
  default: `8`)

_Example:_

```js
// Polish vehicle registration certificate scanned from Aztec 2D barcode
const b64Input = "BgQAANtYAA..."
const binInput = Buffer.from(b64Input, "base64")

// 4 first bytes in Aztec code are output length
const outputLength = binInput.readUInt32LE(0)
const utf16Output = Buffer.alloc(outputLength)
const compressedInput = binInput.slice(4)

nrv2eDecompress(compressedInput, utf16Output)

const textOutput = utf16Output.toString("utf16le")
```

## License

Copyright (c) 2018-2024 Piotr Roszatycki <piotr.roszatycki@gmail.com>

This code is based on UCL data compression library:

Copyright (C) 1996-2002 Markus Franz Xaver Johannes Oberhumer
All Rights Reserved.

[GPL-2.0](https://opensource.org/licenses/GPL-2.0)
