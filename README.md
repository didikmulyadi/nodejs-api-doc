<h1 align="center" style="border-bottom: none;">⚡️@didik-mulyadi/nodejs-api-doc</h1>
<h3 align="center">A package to generate the API docs with multiple UI based on the open API file.</h3>
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

At this point, we are focusing on implementing multiple UI API docs for Nest.JS and Express and working with other libraries that generate the open API doc. 

but, in the future, we will create our open API doc generation, "One Code for All Frameworks".

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

For example, your api doc location is `http://localhost:3000/docs

1. Use Swagger UI, `http://localhost:3000/docs?ui=swagger`
   
![image](https://github.com/didikmulyadi/nodejs-api-doc/assets/26898125/604d25a9-cf5d-415e-ae77-ceed595755b9)


2. Use Stoplight UI, `http://localhost:3000/docs?ui=stoplight`
   
![image](https://github.com/didikmulyadi/nodejs-api-doc/assets/26898125/d3562cf1-37dc-4c02-840b-96e1063f3161)


3. Use Redoc UI, `http://localhost:3000/docs?ui=redoc`

![image](https://github.com/didikmulyadi/nodejs-api-doc/assets/26898125/84232bb9-5fa1-4700-949f-e41ff868be1a)

For code examples, see the `examples` directory or [click](https://github.com/didikmulyadi/nodejs-api-doc/tree/main/examples).

## Implementation 💻

Here's an example of how to use this package:

## nodejs-api-doc with Nest Fastify + @nest/swagger

Step:

1. Modify your `src/main.ts`
2. Create a swagger config with `new DocumentBuilder()`
3. Generate open api document object with `SwaggerModule.createDocument(app, config)`
4. Setup nodejs-api-doc with `new NestApiDoc`
5. Start nodejs-api-doc with `nodejsApiDoc.start()`

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

- [ ] Add support for Express.js
- [ ] Add readme for `bug_report.md`
- [ ] Add readme for `feature_request.md`

## Find Me 📖

Reach me on:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/https://www.linkedin.com/in/didikmulyadi/) [![Medium](https://img.shields.io/badge/Medium-12100E?logo=medium&logoColor=white)](https://medium.com/@https://didikmulyadi.medium.com/)
