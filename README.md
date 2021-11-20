# GarudaHacks NamaTim Backend REST API

REST API Created with expressjs using typescript for garudahacks 2.0 2021

## Setup

1. Copy `.env.example` file to `.env`
2. Fill the .env file accordingly
3. Follow the steps on [Production](#Production) or [Development](#Development) according
on your environment

### Dependency

There are a several software that needs to be installed before setting up the
backend. The requirements differ according whether the environment is
production or development. The following are the requirements:

1. Production
    - docker
    - docker-compose

2. Development
    - npm
    - docker
    - docker-compose

### Production

For production all you need is run docker compose (run on a terminal)

`docker-compose up`

### Development

For development environment you will be using the `docker-compose.dev.yml`. The
file doesn't include the api because we will be making changes to the source code.
(run on a terminal)

1. run `npm ci`
2. run `docker-compose -f docker-compose.dev.yml`
