import {
  ApiDocPlatformConfig,
  ApiDocPlatform,
  ApiDocPlatformType,
} from '@/core/web'

type ApiDocPlatformParameter = {
  config: ApiDocPlatformConfig
  defaultType: ApiDocPlatformType
}

class NodeJSApiDocHandler {
  #openApiPath: string
  #document: any
  #apiDocPlatform: ApiDocPlatform

  constructor(
    openApiPath: string,
    document: any,
    apiDocPlatform: ApiDocPlatformParameter
  ) {
    this.#openApiPath = openApiPath
    this.#document = document
    this.#apiDocPlatform = new ApiDocPlatform(
      this.#openApiPath,
      apiDocPlatform.defaultType,
      apiDocPlatform.config
    )
  }

  openApiHandlerParameter = () => {
    return [
      `${this.#openApiPath}/openapi`,
      (_: any, res: any) => {
        res.type('application/json').send(this.#document)
      },
    ]
  }

  docsHandlerParameter = () => {
    return [
      this.#openApiPath,
      (req: any, res: any) => {
        res
          .type('text/html')
          .send(this.#apiDocPlatform.determineUI(req.query.ui))
      },
    ]
  }
}

export { NodeJSApiDocHandler }
