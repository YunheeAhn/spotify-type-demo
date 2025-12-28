import type { Explicit, ExternalURLs, Followers, Image } from "./commonType";

export interface User {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: Explicit;
  external_urls?: ExternalURLs;
  followers?: Followers;
  href?: string;
  id?: string;
  images?: Image[];
  product?: string;
  type?: string;
  uri?: string;
}
