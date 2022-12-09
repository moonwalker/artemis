import { readFile, writeFile } from 'fs/promises'

const html2json = async () => {
  const html = await readFile('dist/index.html', 'utf8')
  await writeFile('../../packages/cli/src/assets/admin.json', JSON.stringify({ body: html }))
}

html2json()
