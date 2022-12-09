import { readFile, writeFile } from 'fs/promises'

const html2js = async () => {
  const html = await readFile('dist/index.html', 'utf8')
  await writeFile('dist/index.json', JSON.stringify({ body: html }))
}

html2js()
