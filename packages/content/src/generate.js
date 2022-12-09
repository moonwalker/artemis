import { join, dirname, extname } from 'path'
import { stat, mkdir, readFile, writeFile, unlink } from 'fs/promises'
import { spawn } from 'node:child_process'
import fg from 'fast-glob'
import matter from 'gray-matter'
import chokidar from 'chokidar'

const supportedFiles = ['*.md', '*.mdx', '*.json']

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
  let outfile = join(output, path)
  const outdir = dirname(outfile)

  const exists = await stat(outdir)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await mkdir(outdir, { recursive: true })
  }

  try {
    let data = await readFile(path, 'utf8')

    const ext = extname(path)
    if (ext === '.md' || ext === '.mdx') {
      const parsed = matter(data)
      data = JSON.stringify({ ...parsed.data, body: parsed.content }, null, 2)
      outfile += '.json'
    }

    await writeFile(outfile, data)
    console.log('[ok]', outfile)
  } catch (err) {
    console.error('[err]', outfile, err)
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
