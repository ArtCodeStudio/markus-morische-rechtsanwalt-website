// deno-lint-ignore-file
export interface StrapiRestAPIGet<A> {
  data: {
    id: number;
    attributes: A;
  }
  meta: {}
}
