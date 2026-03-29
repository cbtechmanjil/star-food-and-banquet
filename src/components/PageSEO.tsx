/**
 * <PageSEO> — lightweight per-page <head> manager using react-dom/client.
 *
 * Because this is a Vite SPA (no SSR), meta updates happen client-side.
 * This is fine for Google (which renders JS) but social crawlers and
 * non-JS crawlers will only see the static index.html tags.
 *
 * For further social/preview improvements, add prerendering later.
 */

import { useEffect } from "react";

interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
  /** Optional Open Graph image override. Falls back to /og-image.jpg */
  ogImage?: string;
  /** JSON-LD object(s). Pass an array to inject multiple blocks. */
  jsonLd?: object | object[];
}

const DEFAULT_OG_IMAGE = "/og-image.jpg";

export default function PageSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: PageSEOProps) {
  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────────
    document.title = title;

    // ── Helper to upsert a <meta> tag ───────────────────────────────────
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector
          .replace(/[\[\]"]/g, "")
          .split("=");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // ── Helper to upsert a <link> tag ───────────────────────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // ── Standard meta ────────────────────────────────────────────────────
    setMeta('meta[name="description"]', "content", description);

    // ── Canonical ────────────────────────────────────────────────────────
    setLink("canonical", canonical);

    // ── Open Graph ───────────────────────────────────────────────────────
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", ogImage);

    // ── Twitter Card ────────────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    // ── JSON-LD structured data ──────────────────────────────────────────
    // Remove any previously injected JSON-LD blocks by this component
    document.querySelectorAll('script[data-seo="page-jsonld"]').forEach(
      (el) => el.remove()
    );

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seo = "page-jsonld";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    // Cleanup JSON-LD when the component unmounts (route change)
    return () => {
      document.querySelectorAll('script[data-seo="page-jsonld"]').forEach(
        (el) => el.remove()
      );
    };
  }, [title, description, canonical, ogImage, jsonLd]);

  return null; // nothing rendered into the DOM body
}
