# Superior Prospects API

[![CircleCI](https://circleci.com/gh/shaunfowler/superior-prospects-api/tree/master.svg?style=svg)](https://circleci.com/gh/shaunfowler/superior-prospects-api/tree/master)

The backend API for http://superiorprospects.com.

> Note: This service is depdendent on two Docker secrets (`sp_client_id` and `sp_client_secret`) and sould be deployed in swarm. See the composition repo that contains the docker-compose file: https://github.com/shaunfowler/superior-prospects-composition

### Build

To build the image, run:

```
npm run build:image
```

or

```
docker build -t shaunfowler/sp_server:latest -f Dockerfile .
```