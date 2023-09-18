import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction, LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react";
import tailwindStyles from "./styles/tailwind.css";
import {getUser} from "./session.server";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: tailwindStyles},
  ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
];

export const loader = async ({request}: LoaderFunctionArgs) => {
  return json({user: await getUser(request)});
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
