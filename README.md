# Title

desc

## Quick start guide

### **Install all dependencies**

```bash
npm install
```

### **Start application in development**

```bash
npm run dev
```

### **Unit/Integration tests**

```bash
npm test
```

## Dependencies

* [express](https://www.npmjs.com/package/express)  - Fast, unopinionated, minimalist web framework for node;
* [mongoose](https://www.npmjs.com/package/mongoose) -  Is a MongoDB object modeling tool designed to work in an asynchronous environment;
* [winston](https://www.npmjs.com/package/winston) - A multi-transport async logging library for node.js;
* [winston-transport](https://www.npmjs.com/package/winston-transport) - The base TransportStream implementation for winston >= 3. Use these to write ecosystem Transports for winston.
* [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware;
* [request](https://www.npmjs.com/package/request) - designed to be the simplest way possible to make http calls;
* [request-promise](https://www.npmjs.com/package/request-promise) - the simplified HTTP request client 'request' with Promise support.

## Dev dependencies

* [mocha](https://www.npmjs.com/package/mocha) - Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browse;
* [chai](https://www.npmjs.com/package/chai) - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

## Configuration

All configurations for the application should be passed as environment variables (check [article](https://12factor.net/config) for more information).

To run application locally configuration files outside the application root should be provided as in example bellow:

```bash
-- ms-service/
-- config/
--- dev-ms-service.json
```

Content of __dev-ms-service.json__

```json
{
    "mongodbUri": "localhost",
    "mongodbPort": "27017",
    "mongodbName": "ms-service",
    "apiPath": "/api"
}
```

All configuration can be set as environment variables when deploying application in __production__:

```bash
NODE_ENV=production
MONGO_DB_URI=localhost
MONGO_DB_PORT=27017
MONGO_DB_NAME=ms-service
API_PATH=/api
LOG_LEVEL=debug
```

## Swagger API specifications

Check application [APIs](./swagger.yaml).
