<h1 align="center" style="border-bottom: none;">⚡️@didik-mulyadi/nodejs-api-docs</h1>
<h3 align="center">A package to generate the API docs based on the open API file.</h3>
<br />
<p align="center">
  <p align="center">
    <a href="https://github.com/didikmulyadi/npm-package-creator/issues/new">Bug report</a>
  </p>
</p>
<br />
<hr />

## Installation 🚀

Install `@didik-mulyadi/nodejs-api-docs` using pnpm/npm/yarn:

```bash
pnpm add @didik-mulyadi/nodejs-api-docs

# OR

npm install @didik-mulyadi/nodejs-api-docs

# OR

yarn add @didik-mulyadi/nodejs-api-docs
```

## Usage 💻

Here's an example of how to use this package:

## nodejs-api-doc with @nest/swagger

Step:

1. Modify your `src/main.ts`
2. Create a swagger config with `new DocumentBuilder()`
3. Generate open api document object with `SwaggerModule.createDocument(app, config)`
4. Setup nodejs-api-doc with `new NodejsApiDoc`
5. Start nodejs-api-doc with `nodejsApiDoc.start()`

```typescript
// swagger
const config = new DocumentBuilder()
  .setTitle('Node.js API Docs')
  .setDescription('This API provides ...')
  .setVersion('0.0.1')
  .build()
const document = SwaggerModule.createDocument(app, config)

// nodejs-api-doc
const nodejsApiDoc = new NodejsApiDoc(app, document, {
  defaultUI: 'redoc',
  customPath: '/api-docs',
})
nodejsApiDoc.start()

// Run the nestjs
await app.listen(8080, '0.0.0.0')
```

## Configuration options ⚙️

### Working with Helmet

#### Nest.JS Fastify Helmet

```typescript
import { NodejsApiDoc, helmetConfig } from '@didik-mulyadi/nodejs-api-doc';

async function bootstrap() {
  ...
  await app.register(helmet, helmetConfig.nodeApiDocHelmetOption);
  ...
}
```

## Bugs or Requests 🐛

If you found any issue or have a good suggestion, feel free to open an [issue](https://github.com/didikmulyadi/npm-package-creator/issues/new)
