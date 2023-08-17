import { IBaseFramework } from '@/core/type'
import { JSApiDocBaseFramework } from './base'

/**
 * An API Doc for NestJS
 * @author Didik Mulyadi <didikmulyadi12@gmail.com>
 */
class NestApiDoc extends JSApiDocBaseFramework implements IBaseFramework {
  start() {
    this.setupRoute(this.app.getHttpAdapter())
  }
}

export { NestApiDoc }
