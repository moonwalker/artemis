import { join, dirname } from 'path'
import { stat, mkdir, readFile, writeFile, unlink } from 'fs/promises'
import { spawn } from 'node:child_process'
import fg from 'fast-glob'
import matter from 'gray-matter'
import chokidar from 'chokidar'

const supportedFiles = ['*.md', '*.mdx']

export const generate = async (options) => {
  options = { source: 'content', output: '.artemis/generated', ...options }

  const patterns = supportedFiles.map((t) => {
    return join(options.source, '**', t)
  })

  const entries = await fg(patterns)

  entries.forEach((path) => {
    parseFile({ path, ...options })
  })

  if (options.watch) {
    watch({ patterns, ...options })
  }

  if (options.exec) {
    const cmd = spawn(options.exec, [], { shell: true })
    cmd.stdout.on('data', (output) => console.log(output.toString()))
    cmd.stderr.on('data', (output) => console.error(output.toString()))
  }
}

const parseFile = async ({ path, output }) => {
  const p = join(output, `${path}.json`)
  const d = dirname(p)

  const exists = await stat(d)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await mkdir(d, { recursive: true })
  }

  try {
    const src = await readFile(path, 'utf8')
    const parsed = matter(src)
    const data = {
      ...parsed.data,
      body: parsed.content
    }
    await writeFile(p, JSON.stringify(data, null, 2))
    console.log('[ok]', p)
  } catch (err) {
    console.error('[err]', p, err)
  }
}

const deleteFile = async ({ path, output }) => {
  const p = join(output, `${path}.json`)
  await unlink(p)
}

const watch = ({ patterns, output }) => {
  const watcher = chokidar.watch(patterns, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  watcher
    .on('add', (path) => parseFile({ path, output }))
    .on('change', (path) => parseFile({ path, output }))
    .on('unlink', (path) => deleteFile({ path, output }))
}
