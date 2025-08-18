import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { afterEach, beforeEach, test } from 'node:test'

import {
  createProtocolConnection,
  DidOpenTextDocumentNotification,
  DocumentFormattingRequest,
  InitializeRequest,
  IPCMessageReader,
  IPCMessageWriter,
  type ProtocolConnection,
  PublishDiagnosticsNotification,
  type PublishDiagnosticsParams
} from 'vscode-languageserver/node.js'

const cwd = new URL('..', import.meta.url)
const uri = String(new URL('test.mdx', cwd))
let connection: ProtocolConnection

beforeEach(async () => {
  const serverProcess = spawn('mdxlint-language-server', ['--node-ipc'], {
    cwd,
    stdio: [null, 'inherit', 'inherit', 'ipc']
  })
  connection = createProtocolConnection(
    new IPCMessageReader(serverProcess),
    new IPCMessageWriter(serverProcess)
  )
  connection.onDispose(() => {
    serverProcess.kill()
    connection.end()
  })
  connection.listen()

  await connection.sendRequest(InitializeRequest.type, {
    processId: null,
    rootUri: String(cwd),
    capabilities: {},
    workspaceFolders: null
  })
})

afterEach(() => {
  connection.dispose()
})

test('format', async () => {
  const diagnostics = Promise.withResolvers<PublishDiagnosticsParams>()
  connection.onNotification(PublishDiagnosticsNotification.type, diagnostics.resolve)

  connection.sendNotification(DidOpenTextDocumentNotification.type, {
    textDocument: {
      uri,
      languageId: 'mdx',
      version: 1,
      text: '\n# Hi {user}\n'
    }
  })

  const result = await connection.sendRequest(DocumentFormattingRequest.type, {
    textDocument: { uri },
    options: { tabSize: 2, insertSpaces: true }
  })

  assert.deepEqual(result, [
    {
      range: {
        end: { character: 0, line: 2 },
        start: { character: 0, line: 0 }
      },
      newText: '# Hi {user}\n'
    }
  ])
})

test('lint', async () => {
  const diagnostics = Promise.withResolvers<PublishDiagnosticsParams>()
  connection.onNotification(PublishDiagnosticsNotification.type, diagnostics.resolve)

  connection.sendNotification(DidOpenTextDocumentNotification.type, {
    textDocument: {
      uri,
      languageId: 'mdx',
      version: 1,
      text: '[]()\n'
    }
  })

  assert.deepEqual(await diagnostics.promise, {
    diagnostics: [
      {
        code: 'no-empty-url',
        codeDescription: {
          href: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-empty-url#readme'
        },
        message: 'Unexpected empty link URL referencing the current document, expected URL',
        range: {
          end: { character: 4, line: 0 },
          start: { character: 0, line: 0 }
        },
        severity: 2,
        source: 'remark-lint'
      }
    ],
    uri,
    version: 1
  })
})
