import { handlerParamOpenApi30, handlerParamsDocs } from '@/core/server'
import { IBaseFramework } from '@/core/type'
import { JSApiDocBaseFramework } from './base'

/**
 * An API Doc for NestJS
 * @author Didik Mulyadi <didikmulyadi12@gmail.com>
 */
class NestApiDoc extends JSApiDocBaseFramework implements IBaseFramework {
  start() {
    this.app.getHttpAdapter().get(
      ...handlerParamOpenApi30({
        docPath: this.config.customPath,
        document: this.document,
      })
    )

    this.app.getHttpAdapter().get(
      ...handlerParamsDocs({
        docPath: this.config.customPath,
        defaultUI: this.config.defaultUI,
        docOption: { title: this.config.title, layout: this.config.layout },
      })
    )
  }
}

export { NestApiDoc }
