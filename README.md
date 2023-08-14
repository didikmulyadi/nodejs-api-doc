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

## nodejs-api-doc with @nest/swagger

Here's an example of how to use this package:

```typescript
// src/main.ts
// define the app

// Define the swagger config
const config = new DocumentBuilder()
  .setTitle('Tyre Repair Assessment API')
  .setDescription(
    'This API provides a comprehensive tyre repair assessment. It analyzes the condition of a tyre and provides recommendations for repair or replacement based on a variety of factors, such as tread depth, punctures, and wear patterns.'
  )
  .setVersion('0.0.1')
  .build()
// Genereate the open api document object
const document = SwaggerModule.createDocument(app, config)

// Setup the nodejs-api-doc
const nodejsApiDoc = new NodejsApiDoc(app, document, {
  defaultUI: 'redoc',
  customPath: '/api-docs',
})
// Start the doc
nodejsApiDoc.start()

// Run the nestjs
const port = process.env.PORT || 8080
await app.listen(port, '0.0.0.0')
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
