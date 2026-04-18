export const SITE_NAME = "ProWIFETA";
export const SITE_URL = "https://prowifeta.com";
export const DEFAULT_TITLE = "ProWIFETA | Women in Fashion Education & Training in Ghana";
export const DEFAULT_DESCRIPTION =
  "ProWIFETA connects women in fashion education and training through mentorship, advocacy, networking, leadership visibility, and professional development in Ghana.";
export const DEFAULT_IMAGE = `${SITE_URL}/img/logo.png`;
export const HOME_PAGE_IMAGE = "/img/slides/d1.jpg";
export const BLOG_PAGE_IMAGE =
  "/img/events/agenda-wear-official-launch/agenda-wear-official-launch-01.jpeg";
export const HOME_PAGE_TITLE = DEFAULT_TITLE;
export const HOME_PAGE_DESCRIPTION =
  "Join ProWIFETA, a Ghana-based network for women in fashion education and training focused on mentorship, advocacy, leadership visibility, and professional development.";
export const BLOG_PAGE_TITLE = "ProWIFETA Blog | Events, Outreach & Fashion Education Stories";
export const BLOG_PAGE_DESCRIPTION =
  "Read ProWIFETA event updates, outreach programmes, campaign launches, keynote engagements, and fashion education stories from Ghana.";

const toAbsoluteUrl = (value = "/") => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

const upsertMetaTag = (selector, attributes, content) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertLinkTag = (selector, attributes, href) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("link");
    Object.entries(attributes).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

export const setPageSeo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData = null,
}) => {
  if (typeof document === "undefined") {
    return;
  }

  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);

  document.title = title;

  upsertMetaTag('meta[name="description"]', { name: "description" }, description);
  upsertMetaTag('meta[name="robots"]', { name: "robots" }, "index, follow");
  upsertMetaTag('meta[property="og:type"]', { property: "og:type" }, type);
  upsertMetaTag('meta[property="og:title"]', { property: "og:title" }, title);
  upsertMetaTag(
    'meta[property="og:description"]',
    { property: "og:description" },
    description
  );
  upsertMetaTag('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
  upsertMetaTag('meta[property="og:image"]', { property: "og:image" }, imageUrl);
  upsertMetaTag(
    'meta[property="og:image:alt"]',
    { property: "og:image:alt" },
    `${SITE_NAME} preview image`
  );
  upsertMetaTag(
    'meta[name="twitter:card"]',
    { name: "twitter:card" },
    "summary_large_image"
  );
  upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  upsertMetaTag(
    'meta[name="twitter:description"]',
    { name: "twitter:description" },
    description
  );
  upsertMetaTag('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);
  upsertMetaTag(
    'meta[name="twitter:image:alt"]',
    { name: "twitter:image:alt" },
    `${SITE_NAME} preview image`
  );
  upsertLinkTag('link[rel="canonical"]', { rel: "canonical" }, canonicalUrl);

  let structuredDataScript = document.head.querySelector("#seo-structured-data");
  if (!structuredDataScript) {
    structuredDataScript = document.createElement("script");
    structuredDataScript.type = "application/ld+json";
    structuredDataScript.id = "seo-structured-data";
    document.head.appendChild(structuredDataScript);
  }

  const payload = Array.isArray(structuredData)
    ? { "@context": "https://schema.org", "@graph": structuredData }
    : structuredData;

  structuredDataScript.textContent = payload ? JSON.stringify(payload) : "";
};

export const getOrganizationSchema = () => ({
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  description: DEFAULT_DESCRIPTION,
  sameAs: ["https://www.tiktok.com/@ProWIFETA", "https://youtube.com/@prowifeta-n4c"],
});

export const getWebsiteSchema = () => ({
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
});

export const getHomePageSchema = () => [
  getOrganizationSchema(),
  getWebsiteSchema(),
  {
    "@type": "WebPage",
    name: DEFAULT_TITLE,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  },
];

export const getHomePageSeo = () => ({
  title: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  path: "/",
  image: HOME_PAGE_IMAGE,
  structuredData: getHomePageSchema(),
});

export const getBlogPageSchema = ({ title, description, image }) => [
  getOrganizationSchema(),
  getWebsiteSchema(),
  {
    "@type": "CollectionPage",
    name: title,
    url: `${SITE_URL}/blog`,
    description,
    image: toAbsoluteUrl(image),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  },
];

export const getBlogPageSeo = () => ({
  title: BLOG_PAGE_TITLE,
  description: BLOG_PAGE_DESCRIPTION,
  path: "/blog",
  image: BLOG_PAGE_IMAGE,
  structuredData: getBlogPageSchema({
    title: BLOG_PAGE_TITLE,
    description: BLOG_PAGE_DESCRIPTION,
    image: BLOG_PAGE_IMAGE,
  }),
});
