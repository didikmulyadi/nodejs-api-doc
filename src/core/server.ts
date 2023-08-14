import { UIDocType, determineUI } from './web'

/**
 * A handler to determine the open API
 */
const handlerParamOpenApi30 = (docPath: string, document: object) => [
  `${docPath}/openapi`,
  (_: any, res: any) => {
    res.type('application/json').send(document)
  },
]

/**
 * A handler to determine the docs
 */
const handlerParamsDocs = (docPath: string, defaultUI: UIDocType) => [
  docPath,
  (req: any, res: any) => {
    res
      .type('text/html')
      .send(determineUI({ default: defaultUI, type: req.query.ui }))
  },
]

export { handlerParamOpenApi30, handlerParamsDocs }
