// deno-lint-ignore-file
import { StrapiImageFormat } from "./strapi-image-format.ts";

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    large: StrapiImageFormat;
    medium: StrapiImageFormat;
    small: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  created_at: string;
  updated_at: string;
}
