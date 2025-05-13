This repository is made for education purposes to help developers close the gap between keycloak and nodejs. Essentially it should help everyone to understand the authorization flow better in nodejs.

## Run the project
First run the `yarn` command to install everything. The project is using `volta` so you can have your nodejs and yarn version configured.

After having everything installed, add a `.env` file and add the following to it:
```
APP_PORT=<YOUR_PORT>

DATABASE_URL="postgresql://username:password@database_address:database_port/database_name?schema=public"
```

> Note that the project uses postgres.

After setting up the `.env` file and configured the connection string, now run 

```sh
yarn db:migrate
```

This command will have your database updated and will generate the prisma client under `generated/prisma` for you.

Now, go on and download your own `keycloak.json` as described in the video and put it in the root directory.

If everything up to this point ran fine, you should be able to `yarn dev` the project and test it out.