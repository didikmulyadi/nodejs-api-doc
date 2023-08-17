import { IBaseFramework } from '@/core/type'
import { JSApiDocBaseFramework } from './base'

/**
 * An API Doc for Express
 * @author Didik Mulyadi <didikmulyadi12@gmail.com>
 */
class ExpressApiDoc extends JSApiDocBaseFramework implements IBaseFramework {
  start() {
    this.setupRoute(this.app)
  }
}

export { ExpressApiDoc }
