import { SEOAudio } from "./seo-audio.ts";
import { SEOImage } from "./seo-image.ts";
import { SEOVideo } from "./seo-video.ts";

export interface SEO {
  canonical?: string;
  title?: string;
  description?: string;
  type?: string;
  locale?: string;
  site_name?: string;
  /** @deprecated */
  keywords?: string;
  images: SEOImage[];
  videos: SEOVideo[];
  audios: SEOAudio[];
}
