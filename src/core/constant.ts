import { IStoplight } from './type'
import { ApiDocPlatformType } from './web'

const DEFAULT_API_DOC_PLATFORM: ApiDocPlatformType = 'stoplight'
const DEFAULT_PATH = '/docs'
const DEFAULT_TITLE = 'API Docs'
const DEFAULT_META_DESCRIPTION = 'API Documentation'
const DEFAULT_STOPLIGHT_LAYOUT: IStoplight['layout'] = 'sidebar'

export {
  DEFAULT_PATH,
  DEFAULT_API_DOC_PLATFORM,
  DEFAULT_TITLE,
  DEFAULT_STOPLIGHT_LAYOUT,
  DEFAULT_META_DESCRIPTION,
}
