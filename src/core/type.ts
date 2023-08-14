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

export type { Config, ConfigOnConstructor }
