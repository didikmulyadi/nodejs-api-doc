import { UISwitcherHTML } from '@/components/ui-switcher'

type ApiDocPlatformType = 'stoplight' | 'swagger' | 'redoc'
type ApiDocPlatformConfig = {
  title: string
  metaDescription: string
  /**
   * Only supported for Stoplight
   */
  layout: string
  /**
   * Has UI Switcher
   */
}

class ApiDocPlatform {
  #openApiPath: string
  #config: ApiDocPlatformConfig
  #defaultType: ApiDocPlatformType
  #additionalHTML = `
    ${UISwitcherHTML}
  `

  constructor(
    openApiPath: string,
    defaultType: ApiDocPlatformType,
    config: ApiDocPlatformConfig
  ) {
    this.#openApiPath = openApiPath
    this.#config = config
    this.#defaultType = defaultType
  }

  #getRedocHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
          <head>
              <title>${this.#config.title}</title>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content="${
                this.#config.metaDescription
              }" />
  
              <link
              href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
              rel="stylesheet"
              />
          
              <style>
              body {
                  margin: 0;
                  padding: 0;
              }
              </style>
          </head>
          <body>
              <!--
              Redoc element with link to your OpenAPI definition
              -->
              <redoc spec-url="${this.#openApiPath}/openapi"></redoc>
              ${this.#additionalHTML}
              <!--
              Link to Redoc JavaScript on CDN for rendering standalone element
              -->
              <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
          </body>
      </html>
      `
  }

  #getSwaggerHTML = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="${this.#config.metaDescription}" />
          <title>${this.#config.title}</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.3.2/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          ${this.#additionalHTML}
          <script src="https://unpkg.com/swagger-ui-dist@5.3.2/swagger-ui-bundle.js" crossorigin></script>
          <script src="https://unpkg.com/swagger-ui-dist@5.3.2/swagger-ui-standalone-preset.js" crossorigin></script>
          <script>
            window.onload = () => {
              window.ui = SwaggerUIBundle({
                url: '${this.#openApiPath}/openapi',
                dom_id: '#swagger-ui',
                presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout",
              });
              
            };
          </script>
        </body>
      </html>
    `
  }

  #getStopLightHTML = () => {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="description" content="${this.#config.metaDescription}" />
          <title>${this.#config.title}</title>
          <!-- Embed elements Elements via Web Component -->
          <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
          <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css" />
          <style type="text/css">
            .sl-elements-api {
              min-height: 100vh;
            }

            .sl-elements-api .sl-overflow-y-auto.sl-bg-canvas > div:first-child {
              max-width: 1800px !important;
            }
  
            .sl-elements-api div[data-testid="two-column-right"] {
              max-width: 1000px !important;
            }
  
            @media (max-width: 1024px) {
              .sl-elements-api div[data-testid="two-column-right"] {
                width: 100% !important;
                margin-left: 0 !important;
              }
  
              .sl-elements-api div[data-testid="two-column-left"] {
                width: 100% !important;
              }
  
              .sl-elements-api .sl-overflow-y-auto.sl-bg-canvas > div:first-child > .HttpOperation > div:nth-child(2) {
                display: block !important;
              }
            }
          </style>
        </head>
        <body>
          <elements-api
            apiDescriptionUrl="${this.#openApiPath}/openapi"
            router="hash"
            layout="${this.#config.layout}"
          />
          ${this.#additionalHTML}
        </body>
      </html>
    `
  }

  /**
   * A function to determine the UI based on the type
   * @returns a function to generate the type
   */
  #getUIBasedOnType = (type: ApiDocPlatformType) => {
    if (type === 'redoc') {
      return this.#getRedocHTML()
    }

    if (type === 'stoplight') {
      return this.#getStopLightHTML()
    }

    if (type === 'swagger') {
      return this.#getSwaggerHTML()
    }

    throw new Error(`UI type "${type}" is not supported yet.`)
  }

  /**
   * A function to determine the UI based on the type
   * @returns a function to generate the type
   */
  determineUI = (type: ApiDocPlatformType) => {
    if (type) {
      return this.#getUIBasedOnType(type)
    }

    return this.#getUIBasedOnType(this.#defaultType)
  }
}

export type { ApiDocPlatformType, ApiDocPlatformConfig }
export { ApiDocPlatform }
