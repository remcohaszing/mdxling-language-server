#!/usr/bin/env node

import { mdxlint } from 'mdxlint'
import { createUnifiedLanguageServer } from 'unified-language-server'

process.title = 'mdxlint-language-server'

createUnifiedLanguageServer({
  configurationSection: 'mdxlint',
  defaultProcessor: mdxlint,
  ignoreName: '.mdxlintignore',
  packageField: 'mdxlint',
  pluginPrefix: 'remark',
  processorSpecifier: 'mdxlint',
  rcName: '.mdxlintrc',
  processorName: 'mdxlint'
})
