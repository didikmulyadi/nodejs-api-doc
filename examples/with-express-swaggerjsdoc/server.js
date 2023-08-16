var express = require('express'),
  bodyParser = require('body-parser'),
  swaggerJsdoc = require('swagger-jsdoc')

const { ExpressApiDoc } = require('@didik-mulyadi/nodejs-api-doc')

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/books', require('./routes/books'))

const PORT = process.env.PORT || 3000

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
const expressApiDoc = new ExpressApiDoc(app, document, {
  defaultUI: 'stoplight',
  layout: 'sidebar',
})
expressApiDoc.start()

app.listen(PORT)

console.debug('Server listening on port: ' + PORT)
