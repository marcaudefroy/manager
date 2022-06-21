const concurrently = require('concurrently');
const { program } = require('commander');

program
  .description(
    'Launch the container in development mode with given application',
  )
  .usage('<packageName>')
  .arguments('<packageName>')
  .action(async (packageName) => {
    concurrently(
      [
        'yarn workspace @ovh-ux/manager-container-app run dev',
        `yarn workspace ${packageName} run dev --env.container`,
      ],
      {
        raw: true,
      },
    );
  })
  .parse(process.argv);
