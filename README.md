# Nuxt Navi

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt.js module for building an Array of navigation routes

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-navi` dependency to your project

```bash
yarn add nuxt-navi # or npm install nuxt-navi
```

2. Add `nuxt-navi` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    "nuxt-navi",

    // With options
    [
      "nuxt-navi",
      {
        /* module options */
      }
    ]
  ];
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) David Royer <droyer01@gmail.com>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-navi/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-navi
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-navi.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-navi
[circle-ci-src]: https://img.shields.io/circleci/project/github/davidroyer/nuxt-navi.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/davidroyer/nuxt-navi
[codecov-src]: https://img.shields.io/codecov/c/github/davidroyer/nuxt-navi.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/davidroyer/nuxt-navi
[license-src]: https://img.shields.io/npm/l/nuxt-navi.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-navi
