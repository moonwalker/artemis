const { program } = require('commander')
const { build } = require('./commands')

program
  .name('artemis')
  .description('CLI to parse and generate content')
  .version('0.1.0')

program
  .command('build')
  .description('parse supported file types and generate content files')
  .option('-s, --source <string>', 'source path', 'content')
  .option('-o, --output <string>', 'output path', '.artemis/generated')
  .action(build)

program.parse()
