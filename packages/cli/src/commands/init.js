import { join } from 'path'
import { stat, mkdir } from 'fs/promises'
import decompress from 'decompress'

import adminuri from '../assets/admin.zip'

export const init = async (options) => {
  const d = join(process.cwd(), options.public, 'admin')

  const exists = await stat(d)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await mkdir(d, { recursive: true })
  }

  const adminb64 = adminuri.split(',')[1]
  const adminzip = adminb64 ? Buffer.from(adminb64, 'base64') : ''

  decompress(adminzip, d)
    .then((files) => {
      files.forEach((f) => {
        console.log('>', f.path)
      })
      console.log('[ok]', 'admin')
    })
    .catch((error) => {
      console.log(['err'], error)
    })
}
