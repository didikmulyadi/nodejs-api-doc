import { UIDocType } from './web'

type Config = {
  title: string
  defaultUI: UIDocType
  customPath: string
}

type ConfigOnConstructor = {
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

export type { Config, ConfigOnConstructor, IBaseFramework }
