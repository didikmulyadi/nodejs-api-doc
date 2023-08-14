import { UIDocOption, UIDocType, determineUI } from '@/core/web'

/**
 * A handler to determine the open API
 */
const handlerParamOpenApi30 = (param: {
  docPath: string
  document: object
}) => [
  `${param.docPath}/openapi`,
  (_: any, res: any) => {
    res.type('application/json').send(param.document)
  },
]

/**
 * A handler to determine the docs
 */
const handlerParamsDocs = (param: {
  docPath: string
  defaultUI: UIDocType
  docOption: UIDocOption
}) => [
  param.docPath,
  (req: any, res: any) => {
    res
      .type('text/html')
      .send(
        determineUI({ default: param.defaultUI, type: req.query.ui })(
          param.docPath,
          param.docOption
        )
      )
  },
]

export { handlerParamOpenApi30, handlerParamsDocs }
