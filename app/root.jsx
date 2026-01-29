import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {/* ✅ Polaris MUST wrap Outlet */}
        <AppProvider i18n={enTranslations}>
          <Outlet />
          <s-app-nav>
        <s-link href="/app/billing">Billing</s-link>
      </s-app-nav>

        </AppProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
