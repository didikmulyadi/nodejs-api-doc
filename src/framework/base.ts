import {
  DEFAULT_PATH,
  DEFAULT_STOPLIGHT_LAYOUT,
  DEFAULT_TITLE,
  DEFAULT_UI,
} from '@/core/constant'
import { Config, ConfigOnConstructor } from '@/core/type'

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
    const {
      defaultUI = DEFAULT_UI,
      customPath = DEFAULT_PATH,
      title = DEFAULT_TITLE,
    } = config

    let layout = ''

    if (!config.layout) {
      if (config.defaultUI === 'stoplight') {
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
      defaultUI,
      customPath,
      layout,
    }
  }
}

export { JSApiDocBaseFramework }
