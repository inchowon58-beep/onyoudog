import { useEffect } from "react";
import { BUSINESS, SITE_URL } from "../data/site.js";

function upsertMeta(attr, key, content) {
  let node = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertMetaMulti(property, values) {
  document.head.querySelectorAll(`meta[property="${property}"]`).forEach((node) => node.remove());
  values.filter(Boolean).forEach((content) => {
    const node = document.createElement("meta");
    node.setAttribute("property", property);
    node.setAttribute("content", content);
    document.head.appendChild(node);
  });
}

function upsertLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

export function useSeoDocument({ title, description, url, faqs, images = [] }) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", BUSINESS.name);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertLink("canonical", url);

    const imageUrls = images.length ? images : [`${SITE_URL}/favicon.svg`];
    upsertMetaMulti("og:image", imageUrls);
    upsertMetaMulti("og:image:secure_url", imageUrls);
    if (imageUrls[0]) {
      upsertMeta("property", "og:image:alt", title);
    }

    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          name: title,
          url,
          description,
          inLanguage: "ko-KR",
          image: imageUrls.map((image) => ({ "@type": "ImageObject", url: image })),
          isPartOf: { "@type": "WebSite", name: BUSINESS.name, url: `${SITE_URL}/` },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    };

    let script = document.getElementById("seo-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "seo-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [title, description, url, faqs, images]);
}
