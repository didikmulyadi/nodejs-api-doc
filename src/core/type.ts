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

interface IStoplight {
  layout: 'sidebar' | 'stacked'
}

export type { IBaseFramework, IStoplight }
