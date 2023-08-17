import { UISwitcherHTML } from '@/components/ui-switcher'

type UIDocType = 'stoplight' | 'swagger' | 'redoc'
type UIDocOption = {
  title: string
  layout: string
}

const additionalHTML = `
  ${UISwitcherHTML}
`

const getUIRedocHTML = (openApiPath: string, { title }: UIDocOption) => {
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title}</title>
            <!-- needed for adaptive design -->
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
            rel="stylesheet"
            />
        
            <!--
            Redoc doesn't change outer page styles
            -->
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
            <redoc spec-url="${openApiPath}/openapi"></redoc>
            ${additionalHTML}
            <!--
            Link to Redoc JavaScript on CDN for rendering standalone element
            -->
            <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
        </body>
    </html>
    `
}

const getUISwaggerHTML = (openApiPath: string, { title }: UIDocOption) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SwaggerUI"
        />
        <title>${title}</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.3.2/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        ${additionalHTML}
        <script src="https://unpkg.com/swagger-ui-dist@5.3.2/swagger-ui-bundle.js" crossorigin></script>
        <script src="https://unpkg.com/swagger-ui-dist@5.3.2/swagger-ui-standalone-preset.js" crossorigin></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '${openApiPath}/openapi',
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

const getUIStopLightHTML = (
  openApiPath: string,
  { title, layout }: UIDocOption
) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${title}</title>
        <!-- Embed elements Elements via Web Component -->
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css" />
        <style type="text/css">
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
          apiDescriptionUrl="${openApiPath}/openapi"
          router="hash"
          layout="${layout}"
        />
        ${additionalHTML}
      </body>
    </html>
  `
}

/**
 * A function to determine the UI based on the type
 * @returns a function to generate the type
 */
const getUIBasedOnType = (type: UIDocType) => {
  if (type === 'redoc') {
    return getUIRedocHTML
  }

  if (type === 'stoplight') {
    return getUIStopLightHTML
  }

  if (type === 'swagger') {
    return getUISwaggerHTML
  }

  throw new Error(`UI type "${type}" is not supported yet.`)
}

/**
 * A function to determine the UI based on the type
 * @returns a function to generate the type
 */
const determineUI = (param: { default: UIDocType; type: UIDocType }) => {
  if (param.type) {
    return getUIBasedOnType(param.type)
  }

  return getUIBasedOnType(param.default)
}

export type { UIDocType, UIDocOption }
export { determineUI }
