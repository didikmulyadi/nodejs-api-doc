import { DEFAULT_PATH, DEFAULT_UI } from '@/core/constant'
import { handlerParamOpenApi30, handlerParamsDocs } from '@/core/server'
import { UIDocType } from '@/core/web'

type AdapterType = 'fastify' | 'express'
type Options = {
  defaultUI: UIDocType
  customPath: string
}

type OptionsOnConstructor = {
  /**
   * the default value is stoplight
   */
  defaultUI?: UIDocType
  /**
   * the default value is /docs
   * the value should have / in prefix
   */
  customPath?: string
}

class NodejsApiDoc {
  app: any
  adapterType: AdapterType
  document: any
  options: Options

  /**
   *
   * @param app App should be the result of NestFactory.create function
   * @param document This document is the openAPIObject
   * @param options
   */
  constructor(
    app: any,
    document: object,
    { defaultUI = DEFAULT_UI, customPath = DEFAULT_PATH }: OptionsOnConstructor
  ) {
    if (customPath.charAt(0) !== '/') {
      throw new Error(`Custom path "${customPath}" should be "/${customPath}" `)
    }

    const adapterType = app.getHttpAdapter().getType() as AdapterType

    this.app = app
    this.document = document
    this.adapterType = adapterType
    this.options = {
      defaultUI,
      customPath,
    }
  }

  /**
   * Start the docs with specific path
   *
   * @param app your nestjs app in main.ts
   * @param path the first character should be /
   * @example
   *    const nestStopLight = new NestApiDoc(app, document);
   *    nestStopLight.start();
   */
  start() {
    /**
     * Define the open api (json) route path
     */
    this.app
      .getHttpAdapter()
      .get(...handlerParamOpenApi30(this.options.customPath, this.document))

    /**
     * Define the open api docs route path
     */
    this.app
      .getHttpAdapter()
      .get(
        ...handlerParamsDocs(this.options.customPath, this.options.defaultUI)
      )
  }
}

export { NodejsApiDoc }
