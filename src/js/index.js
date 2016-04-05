import background from './background/';

background();

process.on('uncaughtException', function (er) {
  console.error(er.stack)
  process.exit(1)
});