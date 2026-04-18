import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { getBlogPageSeo, getHomePageSeo } from "./utils/seo.js";

const ROUTES = [
  {
    pathname: "/",
    outputPath: "index.html",
    seo: getHomePageSeo(),
  },
  {
    pathname: "/blog",
    outputPath: path.join("blog", "index.html"),
    seo: getBlogPageSeo(),
  },
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const serializeStructuredData = (value) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    return html;
  }

  return html.replace(pattern, replacement);
};

const applySeoToHtml = (template, seo) => {
  const structuredData = Array.isArray(seo.structuredData)
    ? { "@context": "https://schema.org", "@graph": seo.structuredData }
    : seo.structuredData;

  let html = template;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`
  );
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(seo.url)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(seo.url)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`
  );
  html = replaceTag(
    html,
    /<script\s+type="application\/ld\+json"\s+id="seo-structured-data">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="seo-structured-data">${serializeStructuredData(
      structuredData
    )}</script>`
  );

  return html;
};

const injectAppHtml = (template, appHtml) =>
  replaceTag(template, /<div id="root"><\/div>/i, `<div id="root">${appHtml}</div>`);

const renderRoute = (pathname) =>
  renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>
  );

export async function prerender() {
  const distDir = path.resolve(process.cwd(), "dist");
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");

  for (const route of ROUTES) {
    const appHtml = renderRoute(route.pathname);
    const html = applySeoToHtml(
      injectAppHtml(template, appHtml),
      {
        ...route.seo,
        url: `https://prowifeta.com${route.pathname === "/" ? "/" : route.pathname}`,
        image: route.seo.image.startsWith("http")
          ? route.seo.image
          : `https://prowifeta.com${route.seo.image}`,
      }
    );
    const outputFile = path.join(distDir, route.outputPath);

    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, html, "utf8");
  }
}
