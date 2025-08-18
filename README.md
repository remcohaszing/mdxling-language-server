# mdxlint

[![github actions](https://github.com/remcohaszing/mdxlint-language-server/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/mdxlint-language-server/actions/workflows/ci.yaml)
[![npm version](https://img.shields.io/npm/v/mdxlint-language-server)](https://www.npmjs.com/package/mdxlint-language-server)
[![npm downloads](https://img.shields.io/npm/dm/mdxlint-language-server)](https://www.npmjs.com/package/mdxlint-language-server)

![](logo.svg)

A language server for [mdxlint](https://github.com/remcohaszing/mdxlint).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [LSP settings](#lsp-settings)
- [Configuration file](#configuration-file)
  - [Plugins](#plugins)
  - [Settings](#settings)
- [Compatibility](#compatibility)
- [Related projects](#related-projects)
- [Sponsoring](#sponsoring)
- [License](#license)

## Installation

```sh
npm install mdxlint-language-server
```

## Usage

The mdxlint language server supports the following
[LSP](https://microsoft.github.io/language-server-protocol/) features:

- [Diagnostics](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_publishDiagnostics)
- [Code actions](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_codeAction)
- [Document formatting](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_formatting)

### LSP settings

The mdxlint language server supports the following settings:

- `mdxlint.requireConfig` (`boolean`, default: `false`) — If true, only perform actions if a
  [configuration file](#configuration-file) is found.

## Configuration file

The mdxlint CLI loads one the following configuration files:

- The `mdxlint` key in `package.json`
- `.mdxlintrc`
- `.mdxlintrc.json`
- `.mdxlintrc.js`
- `.mdxlintrc.cjs`
- `.mdxlintrc.mjs`
- `.mdxlintrc.yml`
- `.mdxlintrc.yaml`

For examples, see the [mdxlint examples](https://github.com/remcohaszing/mdxlint#examples). Ignore
patterns can be specified in `.mdxlintignore`.

### Plugins

The `plugins` property specifies which plugins or presets to load. All
[remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) and
[remark-lint rules](https://github.com/remarkjs/remark-lint#rules) are supported.

### Settings

The `settings` property specifies how content is formatted. It accepts the same fields as the
[options](https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#options) from
`remark-stringify`.

## Compatibility

This project is compatible with Node.js 20 or greater and uses LSP version 3.17.

## Related projects

- [`mdxlint`](https://github.com/remcohaszing/mdxlint) provides the CLI.

## Sponsoring

If you like this project, consider sponsoring me via
[GitHub Sponsors](https://github.com/sponsors/remcohaszing).

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
