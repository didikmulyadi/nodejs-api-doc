import { handlerParamOpenApi30, handlerParamsDocs } from '@/core/server'
import { IBaseFramework } from '@/core/type'
import { JSApiDocBaseFramework } from './base'

/**
 * An API Doc for Express
 * @author Didik Mulyadi <didikmulyadi12@gmail.com>
 */
class ExpressApiDoc extends JSApiDocBaseFramework implements IBaseFramework {
  start() {
    this.app.get(
      ...handlerParamOpenApi30({
        docPath: this.config.customPath,
        document: this.document,
      })
    )

    this.app.get(
      ...handlerParamsDocs({
        docPath: this.config.customPath,
        defaultUI: this.config.defaultUI,
        docOption: { title: this.config.title },
      })
    )
  }
}

export { ExpressApiDoc }
