import {
  DEFAULT_PATH,
  DEFAULT_STOPLIGHT_LAYOUT,
  DEFAULT_TITLE,
  DEFAULT_API_DOC_PLATFORM,
} from '@/core/constant'
import { NodeJSApiDocHandler } from '@/core/server'
import { IStoplight } from '@/core/type'
import { ApiDocPlatformType } from '@/core/web'

type Config = {
  title: string
  apiDocPlatfomDefault: ApiDocPlatformType
  apiDocPlatfomLayout: string
  path: string
}

type BaseConfigOnConstructor = {
  /**
   * The page title
   * @default "API Docs"
   */
  title?: string

  /**
   * the default of doc path, the value should have / in prefix
   * @default "/docs"
   */
  customPath?: string
}

type StoplightConfigOnConstructor = {
  /**
   * The default of UI Doc
   * @default "stoplight"
   */
  apiDocPlatform?: 'stoplight'
  /**
   * @deprecated use apiDocPlatform
   */
  defaultUI?: never
  /**
   * A layout based on the default UI
   */
  layout?: IStoplight['layout']
} & BaseConfigOnConstructor

type StoplightOldConfigOnConstructor = {
  /**
   * The default of UI Doc
   * @default "stoplight"
   * @deprecated use apiDocPlatform
   */
  defaultUI?: 'stoplight'
  apiDocPlatform?: 'stoplight'
  /**
   * A layout based on the default UI
   */
  layout?: IStoplight['layout']
} & BaseConfigOnConstructor

type OtherConfigOnConstructor = {
  /**
   * The default of UI Doc
   * @default "stoplight"
   * @deprecated use apiDocPlatform
   */
  defaultUI?: Exclude<ApiDocPlatformType, 'stoplight'>
  apiDocPlatform?: Exclude<ApiDocPlatformType, 'stoplight'>
  /**
   * A layout based on the default UI
   */
  layout?: null
} & BaseConfigOnConstructor

type ConfigOnConstructor =
  | StoplightConfigOnConstructor
  | StoplightOldConfigOnConstructor
  | OtherConfigOnConstructor

class JSApiDocBaseFramework {
  app: any
  document: any
  config: Config

  /**
   *
   * @param app App should be the result of NestFactory.create function
   * @param document This document is the openAPIObject
   * @param config
   * @example app
   * 
   * // Nest.js with Express
   * const app = await NestFactory.create(AppModule);
   * 
   * // Nest.js with Fastify
   * const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
     )
  );
   * // Express
   * const app = express()
   * 
   */
  constructor(app: any, document: object, config: ConfigOnConstructor = {}) {
    const { customPath = DEFAULT_PATH, title = DEFAULT_TITLE } = config

    let layout = ''
    let apiDocPlatformType: ApiDocPlatformType =
      config.apiDocPlatform ?? config.defaultUI ?? DEFAULT_API_DOC_PLATFORM

    if (!config.layout) {
      if (apiDocPlatformType === 'stoplight') {
        layout = DEFAULT_STOPLIGHT_LAYOUT
      }
    } else {
      layout = config.layout
    }

    if (!customPath.startsWith('/', 0)) {
      throw new Error(`Custom path "${customPath}" should be "/${customPath}" `)
    }

    this.app = app
    this.document = document
    this.config = {
      title,
      apiDocPlatfomDefault: apiDocPlatformType,
      path: customPath,
      apiDocPlatfomLayout: layout,
    }
  }

  /**
   * Define the needed route
   * @param router should be a class or object that responsible to determine the route
   */
  setupRoute(router: any) {
    const nodeJSApiDocHandler = new NodeJSApiDocHandler(
      this.config.path,
      this.document,
      {
        config: {
          title: this.config.title,
          layout: this.config.apiDocPlatfomLayout,
          metaDescription: '',
        },
        defaultType: this.config.apiDocPlatfomDefault,
      }
    )

    router.get(...nodeJSApiDocHandler.openApiHandlerParameter())
    router.get(...nodeJSApiDocHandler.docsHandlerParameter())
  }
}

export { JSApiDocBaseFramework }
