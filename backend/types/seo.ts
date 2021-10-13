// deno-lint-ignore-file
export interface SEO {
  canonical?: string;
  title?: string;
  description?: string;
  type?: string;
  locale?: string;
  site_name?: string;
  keywords?: string;
  image?: {
    url: string;
    secure_url: string;
    type: string;
    width: number;
    height: number;
    alt: string;
  };
  video?: {
    url: string;
    secure_url: string;
    type: string;
    width: number;
    height: number;
  };
  audio?: {
    url: string;
    secure_url: string;
  };
}
