const { program } = require('commander')
const { init, dev, build } = require('./commands')

program
  .name('artemis')
  .description('CLI to parse and generate content')
  .version('0.1.0')

program
  .command('init')
  .description('bootstrap project install dependencies')
  .option('-p, --public <path>', 'public path', 'public')
  .action(init)

program
  .command('dev')
  .description('generate content files and watch for changes')
  .option('-s, --source <path>', 'source path', 'content')
  .option('-o, --output <path>', 'output path', '.artemis/generated')
  .option('-e, --exec <cmd>', 'external command to run')
  .action(dev)

program
  .command('build')
  .description('parse supported file types and generate content files')
  .option('-s, --source <path>', 'source path', 'content')
  .option('-o, --output <path>', 'output path', '.artemis/generated')
  .action(build)

program.parse()
