# Express server for user-manager SDK NPM package.

### Run with Docker Compose (recommended if you have Docker)

``` docker compose up --build ```

### Run the server locally:
````npm install````
``` npm run dev_local ```


### Run the tests (Docker only):

``` Docker  compose run --rm test ```


### Environment Configuration Overview
1. A "bootstrap.js" file is loaded automatically on startup to manage environment variables using dotenv.


2. config/{environment}.env is loaded based on process.env.ENVIRONMENT, which is set by the script in package.json (e.g., npm run dev_local sets ENVIRONMENT=dev).

3. config/shared.env holds variables common to all environments.

4. Inside of config/, MAKE SURE you rename any "example*....env" by removing the "example" part. Example: example-shared.env -> shared.env

5. Also, MAKE SURE you set the required env variables in the -example files if they are not set