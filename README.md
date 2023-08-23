<h1 align="center" style="border-bottom: none;">@didik-mulyadi/nodejs-api-doc⚡️</h1>
<h3 align="center">NPM package to generate the API docs based on the open API file with multiple UI support</h3>
<p align="center">
  <p align="center">
    <a href="https://www.npmjs.com/package/@didik-mulyadi/nodejs-api-doc">
      <img alt="npm latest version" src="https://img.shields.io/npm/v/@didik-mulyadi/nodejs-api-doc/latest.svg">
    </a>
    <a href="https://www.npmjs.com/package/@didik-mulyadi/nodejs-api-doc">
      <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@didik-mulyadi/nodejs-api-doc">
    </a>
    <img alt="Visitors count" src="https://visitor-badge.laobi.icu/badge?page_id=@didik-mulyadi~nodejs-api-doc.visitor-badge&style=flat-square&color=0088cc">
    <a href="https://www.npmjs.com/package/@didik-mulyadi/nodejs-api-doc">
      <img alt="NPM license" src="https://img.shields.io/npm/l/@didik-mulyadi/nodejs-api-doc">
    </a>
  </p>
</p>
<br />
<p align="center">
   <a href="https://github.com/didikmulyadi/nodejs-api-doc/issues/new?template=bug_report.md">Bug report</a>      ·
   <a href="https://github.com/didikmulyadi/nodejs-api-doc/issues/new?template=feature_request.md">Feature request</a>
</p>
<br />
<hr />

This package already supports NestJS and ExpressJS. <br/><br/>
At this point, we are focusing on adding examples with many js-doc libraries. In the future, we will create our open API doc generation, "One Code for All Frameworks", but don't worry we are still making it support with other libraries.

## Features 🚀

1. Support multiple API doc platform UI, options: Swagger, Stoplight, and Redoc
2. Easy to change the UI by query params `?ui=swagger|stoplight|redoc` or UI Switcher at the bottom right of the page
3. Easy implementation, no need to refactor your existing code

## Installation 🚀

Install `@didik-mulyadi/nodejs-api-doc` using pnpm/npm/yarn:

```bash
pnpm add @didik-mulyadi/nodejs-api-doc

# OR

npm install @didik-mulyadi/nodejs-api-doc

# OR

yarn add @didik-mulyadi/nodejs-api-doc
```

## Usage 💻

After we set up the package correctly, we can switch the UI in your docs with this. <br/>

For example, your API doc location is `http://localhost:3000/docs

1. Use Swagger UI, `http://localhost:3000/docs?ui=swagger`

![image](https://github.com/didikmulyadi/nodejs-api-doc/assets/26898125/604d25a9-cf5d-415e-ae77-ceed595755b9)

2. Use Stoplight UI, `http://localhost:3000/docs?ui=stoplight`

![image](https://github.com/didikmulyadi/nodejs-api-doc/assets/26898125/d3562cf1-37dc-4c02-840b-96e1063f3161)

3. Use Redoc UI, `http://localhost:3000/docs?ui=redoc`

![image](https://github.com/didikmulyadi/nodejs-api-doc/assets/26898125/84232bb9-5fa1-4700-949f-e41ff868be1a)

For code examples, see the `examples` directory or [click](https://github.com/didikmulyadi/nodejs-api-doc/tree/main/examples).

## Compatibility ⚙️

This package supports any package/library that returns the open API object. These are tested framework and library that is compatible with our package:

| Library                                                                                | Support |
| -------------------------------------------------------------------------------------- | ------- |
| Nest JS + Fastify with [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) | ✅      |
| Nest JS + Express with [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) | ✅      |
| Express with [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)              | ✅      |

## Implementation 💻

Here's an example of how to use this package:

### nodejs-api-doc with Nest Fastify + @nest/swagger

Step:

1. Modify your `src/main.ts` with the below steps
2. Create a swagger config with `new DocumentBuilder()`
3. Generate open API document object with `SwaggerModule.createDocument(app, config)`
4. Setup nodejs-api-doc with `new NestApiDoc`
5. Start nodejs-api-doc with `nestApiDoc.start()`

```typescript
import { NestApiDoc } from '@didik-mulyadi/nodejs-api-doc'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Node.js API Docs')
    .setDescription('This API provides ...')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  // nodejs-api-doc
  const nestApiDoc = new NestApiDoc(app, document, {
    defaultUI: 'stoplight',
    customPath: '/docs',
  })
  nestApiDoc.start()

  // Run the nestjs
  await app.listen(8080, '0.0.0.0')
}
```

### nodejs-api-doc with Nest Express + @nest/swagger

Step:

1. Modify your `src/main.ts` with the below steps
2. Create a swagger config with `new DocumentBuilder()`
3. Generate open API document object with `SwaggerModule.createDocument(app, config)`
4. Setup nodejs-api-doc with `new NestApiDoc`
5. Start nodejs-api-doc with `nestApiDoc.start()`

```typescript
import { NestApiDoc } from '@didik-mulyadi/nodejs-api-doc'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Node.js API Docs')
    .setDescription('This API provides ...')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  // nodejs-api-doc
  const nestApiDoc = new NestApiDoc(app, document, {
    defaultUI: 'stoplight',
    customPath: '/docs',
  })
  nestApiDoc.start()

  // Run the nestjs
  await app.listen(8080, '0.0.0.0')
}
```

### nodejs-api-doc with Express + swagger-jsdoc

Step:

1. Modify your `server.js` or `main.js` with the below steps
2. Call the swagger-jsdoc `const document = swaggerJsdoc(options)`
3. Setup nodejs-api-doc `const expressApiDoc = new ExpressApiDoc(app, document)`
4. Start nodejs-api-doc `expressApiDoc.start()`

```typescript
const { ExpressApiDoc } = require('@didik-mulyadi/nodejs-api-doc')

const app = express()

...

// swagger-jsdoc
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Node JS API Docs with Express',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Didik Mulyadi',
        url: 'https://www.linkedin.com/in/didikmulyadi/',
        email: 'didikmulyadi12@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
}
const document = swaggerJsdoc(options)

// Nodejs-api-doc
const expressApiDoc = new ExpressApiDoc(app, document)
expressApiDoc.start()

app.listen(3000)
```

## Configuration options ⚙️

### Working with Helmet

#### Nest.JS Fastify Helmet

```typescript
import { NestApiDoc, helmetConfig } from '@didik-mulyadi/nodejs-api-doc';

async function bootstrap() {
  ...
  await app.register(helmet, helmetConfig.nodeApiDocHelmetOption);
  ...
}
```

## Bugs or Requests 🐛

If you found any issues or have a good suggestion, feel free to open an [issue](https://github.com/didikmulyadi/nodejs-api-doc/issues/new)

## TODO

We are still updating this package, to make it more useful and easy to use. Here are the next that author wants to do

- [ ] Add readme for `bug_report.md`
- [ ] Add readme for `feature_request.md`

## Find Me 📖

Reach me on:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/https://www.linkedin.com/in/didikmulyadi/) [![Medium](https://img.shields.io/badge/Medium-12100E?logo=medium&logoColor=white)](https://medium.com/@https://didikmulyadi.medium.com/)
