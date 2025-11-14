import { NextResponse } from 'next/server';

/**
 * Serve the Crowdin **App Descriptor (manifest)** as a JSON response.
 *
 * The manifest tells Crowdin how to install and integrate the app:
 *   – identifier, name, logo
 *   – OAuth details (client id)
 *   – event web-hooks (installed / uninstall)
 *   – requested scopes
 *   – app modules (project-menu, custom file format, etc.)
 *
 * The route is automatically picked up by Next.js because it lives inside the
 * `app/manifest.json` folder and returns a `NextResponse` with `.json()`.
 */
export async function GET() {
  // const modules = {
  //     'project-menu': [{ key: 'menu', name: 'Getting Started', url: '/' }],
  //   };
  const modules = {
    "ai-tools-widget": [
      {
        "key": "custom-data-visualization",
        "toolType": "function",
        "function": {
          "name": "display_custom_graph",
          "description": "Render a custom graph based on project-specific data.",
          "parameters": {
            "type": "object",
            "properties": {
              "dataType": {
                "type": "string",
                "description": "The type of data to visualize (e.g., 'translation progress', 'quality assurance')."
              },
              "timeFrame": {
                "type": "string",
                "description": "The time frame for the data (e.g., 'last_week', 'last_month')."
              }
            },
            "required": ["dataType", "timeFrame"]
          }
        },
        "url": "/ai-tools-widget/display_custom_graph/index.html"
      }
    ]
  };
  
  const manifestData = {
    identifier: 'getting-started',
    name: 'Getting Started',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    logo: '/logo.svg',
    authentication: {
      type: 'none',
    },
    scopes: ['project'],
    modules: modules,
  };

  return NextResponse.json(manifestData);
}
