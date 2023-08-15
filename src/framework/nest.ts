import { DEFAULT_PATH, DEFAULT_TITLE, DEFAULT_UI } from '@/core/constant'
import { handlerParamOpenApi30, handlerParamsDocs } from '@/core/server'
import { Config, ConfigOnConstructor } from '@/core/type'

type AdapterType = 'fastify' | 'express'

class NestApiDoc {
  app: any
  adapterType: AdapterType
  document: any
  config: Config

  /**
   *
   * @param app App should be the result of NestFactory.create function
   * @param document This document is the openAPIObject
   * @param config
   */
  constructor(
    app: any,
    document: object,
    {
      defaultUI = DEFAULT_UI,
      customPath = DEFAULT_PATH,
      title = DEFAULT_TITLE,
    }: ConfigOnConstructor
  ) {
    if (!customPath.startsWith('/', 0)) {
      throw new Error(`Custom path "${customPath}" should be "/${customPath}" `)
    }

    const adapterType = app.getHttpAdapter().getType() as AdapterType

    this.app = app
    this.document = document
    this.adapterType = adapterType
    this.config = {
      title,
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
    this.app.getHttpAdapter().get(
      ...handlerParamOpenApi30({
        docPath: this.config.customPath,
        document: this.document,
      })
    )

    /**
     * Define the open api docs route path
     */
    this.app.getHttpAdapter().get(
      ...handlerParamsDocs({
        docPath: this.config.customPath,
        defaultUI: this.config.defaultUI,
        docOption: { title: this.config.title },
      })
    )
  }
}

export { NestApiDoc }
