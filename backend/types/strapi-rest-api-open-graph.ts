import { StrapiRestAPIList } from "./strapi-rest-api-list.ts";
import { StrapiImage } from "./strapi-image.ts";

export interface OpenGraph {
  title?: string | null;
  description?: string | null;
  type: "website" | "article" | "book" | "profile" | "music_song" | "music_album" | "music_playlist" | "music_radio_station" | "video_movie" | "video_episode" | "video_tv_show" | "video_other";
  site_name?: string;
  images?: StrapiRestAPIList<StrapiImage>;
}

