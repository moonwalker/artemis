import { readFile, writeFile } from 'fs/promises'

const copyhtml = async () => {
  const html = await readFile('dist/index.html', 'utf8')
  await writeFile('../../packages/cli/dist/admin.html', JSON.stringify({ body: html }))
}

copyhtml()
