import { OpenGraphAudio } from "./open-graph-audio.ts";
import { OpenGraphImage } from "./open-graph-image.ts";
import { OpenGraphVideo } from "./open-graph-video.ts";

export interface OpenGraph {
  canonical?: string;
  title?: string;
  description?: string;
  type?: "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio.station" | "video.movie" | "video.episode" | "video.tv.show" | "video.other";
  locale?: "de_DE";
  site_name?: string;
  images: OpenGraphImage[];
  videos: OpenGraphVideo[];
  audios: OpenGraphAudio[];
}
