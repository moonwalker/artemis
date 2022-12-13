import { join, dirname, extname, basename, parse } from 'path'
import { stat, mkdir, readFile, writeFile, unlink } from 'fs/promises'
import { spawn } from 'node:child_process'
import fg from 'fast-glob'
import matter from 'gray-matter'
import chokidar from 'chokidar'
import camelCase from 'camelcase'

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
    const slug = parse(path).name

    const ext = extname(path)
    if (ext === '.json') {
      data = { slug, ...JSON.parse(data) }
    }
    if (ext === '.md' || ext === '.mdx') {
      const parsed = matter(data)
      const body = parsed.content.trim()
      data = { slug, ...parsed.data, body }
      outfile += '.json'
    }

    await writeFile(outfile, JSON.stringify(data, null, 2))
    console.log('[ok]', outfile)

    await generateIndex(outdir)
  } catch (err) {
    console.error('[err]', outfile, err)
  }
}

const generateIndex = async (outdir) => {
  let data = ''
  let names = []

  const entries = await fg(join(outdir, '*.json'))

  entries.forEach((path) => {
    const name = camelCase(parse(path).name)
    names.push(name)
    data += `import ${name} from './${basename(
      path
    )}' assert { type: 'json' }\n`
  })

  const collection = basename(outdir)
  data += `\nexport const ${collection} = [${names.join(', ')}]\n`

  const outfile = join(outdir, 'index.js')
  await writeFile(outfile, data)
  console.log('[ok]', outfile)
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
