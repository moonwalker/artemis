import { join } from 'path'
import { stat, mkdir, readFile, writeFile } from 'fs/promises'

export const init = async (options) => {
  const d = join(process.cwd(), options.public, 'admin')

  const exists = await stat(d)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await mkdir(d, { recursive: true })
  }

  const html = await readFile('dist/admin.html', 'utf8')
  const p = join(d, 'index.html')
  await writeFile(p, html)

  console.log('[ok]', p)
}
