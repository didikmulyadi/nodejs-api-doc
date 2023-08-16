import { UIDocType } from './web'

type Config = {
  title: string
  defaultUI: UIDocType
  customPath: string
  layout: string
}

interface IStoplight {
  layout: 'sidebar' | 'stacked'
}

type ConfigOnConstructor =
  | {
      /**
       * The page title
       * @default "API Docs"
       */
      title?: string
      /**
       * The default of UI Doc
       * @default "stoplight"
       */
      defaultUI?: 'stoplight'
      /**
       * the default of doc path, the value should have / in prefix
       * @default "/docs"
       */
      customPath?: string
      /**
       * A layout based on the default UI
       */
      layout?: IStoplight['layout']
    }
  | {
      /**
       * The page title
       * @default "API Docs"
       */
      title?: string
      /**
       * The default of UI Doc
       * @default "stoplight"
       */
      defaultUI?: UIDocType
      /**
       * the default of doc path, the value should have / in prefix
       * @default "/docs"
       */
      customPath?: string
      /**
       * A layout based on the default UI
       */
      layout: undefined
    }

interface IBaseFramework {
  /**
   * Start the docs with specific path
   *
   * This start will define 2 path with GET method
   * 1. /docs/openapi return the open api json
   * 2. /docs return the api docs UI
   *
   */
  start(): void
}

export type { Config, ConfigOnConstructor, IBaseFramework, IStoplight }
