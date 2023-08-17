/**
 * Allow a request to below domain
 */
const nodeApiDocHelmetOptionScripts: string[] = [
  "'self'",
  "'unsafe-inline'",
  'https://unpkg.com',
  'https://stackpath.bootstrapcdn.com',
  'https://cdnjs.cloudflare.com',
  'https://unpkg.com/@stoplight',
  'https://code.jquery.com',
  'https://cdnjs.cloudflare.com',
  'https://stackpath.bootstrapcdn.com',
  'https://cdn.jsdelivr.net',
  'https://cdn.redoc.ly',
]

/**
 * Allow a request to below domain
 */
const nodeApiDocHelmetOptionStyles: string[] = [
  "'self'",
  "'unsafe-inline'",
  'https://unpkg.com',
  'https://stackpath.bootstrapcdn.com',
  'https://cdnjs.cloudflare.com',
  'https://fonts.googleapis.com',
]

/**
 * Allow a request to below path/domain
 */
const nodeApiDocHelmetOptionWorkers: string[] = [
  "'self'",
  "'unsafe-inline'",
  'blob:',
]

/**
 * Allow a request to below path/domain
 */
const nodeApiDocHelmetOptionImages: string[] = [
  "'self'",
  "'unsafe-inline'",
  'https://cdn-icons-png.flaticon.com',
  'https://avatars.githubusercontent.com',
  'https://res.cloudinary.com',
]

/**
 * If you are using a helmet library, there may be a problem with CSP, use this to solve it.
 * If you have already an option, and want to merge this config, you can use NestApiDocHelmetOptionScripts and NestApiDocHelmetOptionStyles
 */
const nodeApiDocHelmetOption: any = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: nodeApiDocHelmetOptionScripts,
      styleSrc: nodeApiDocHelmetOptionStyles,
      workerSrc: nodeApiDocHelmetOptionWorkers,
      imgSrc: nodeApiDocHelmetOptionImages,
    },
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginEmbedderPolicy: false,
}

export {
  nodeApiDocHelmetOptionScripts,
  nodeApiDocHelmetOptionStyles,
  nodeApiDocHelmetOptionWorkers,
  nodeApiDocHelmetOption,
}
