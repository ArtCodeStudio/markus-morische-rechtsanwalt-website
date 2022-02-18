import { SEOAudio } from "./seo-audio.ts";
import { SEOImage } from "./seo-image.ts";
import { SEOVideo } from "./seo-video.ts";

export interface SEOSchema {
  person?: {
    "@context": "https://schema.org",
    "address": {
      "@type": "PostalAddress",
      //** Cuxhaven, Germany  */
      "addressLocality"?: string;
      /** Niedersachsen */
      "addressRegion"?: string;
      "postalCode": string;
      "streetAddress": string;
    },
    "email": string;
    "image": string;
    "jobTitle": string;
    "name": string;
    "telephone": string;
    "url": string;
  }
}
