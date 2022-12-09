import { join } from 'path'
import { stat, mkdir, writeFile } from 'fs/promises'
import admin from '../assets/admin.json'

export const init = async (options) => {
  const d = join(process.cwd(), options.public, 'admin')

  const exists = await stat(d)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await mkdir(d, { recursive: true })
  }

  const p = join(d, 'index.html')
  await writeFile(p, admin.body)

  console.log('[ok]', p)
}
