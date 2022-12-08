import { join, dirname } from 'path'
import { readFile, writeFile, stat, mkdir } from 'fs/promises'
import fg from 'fast-glob'
import matter from 'gray-matter'

const supportedFiles = ['*.md', '*.mdx']

export const generate = async (options) => {
  options = { source: 'content', output: '.artemis/generated', ...options }

  const patterns = supportedFiles.map((t) => {
    return join(options.source, '**', t)
  })

  const entries = await fg(patterns)

  parseEntries({ entries, output: options.output })
}

const parseEntries = ({ entries, output }) => {
  const rw = async (e) => {
    const p = join(output, `${e}.json`)
    const d = dirname(p)

    const x = await stat(d)
      .then(() => true)
      .catch(() => false)

    if (!x) {
      await mkdir(d, { recursive: true })
    }

    try {
      const src = await readFile(e, 'utf8')
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

  entries.forEach(rw)
}
