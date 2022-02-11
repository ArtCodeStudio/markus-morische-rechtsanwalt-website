// deno-lint-ignore-file
export interface StrapiRestAPIList<A> {
  data: {
    id: number;
    attributes: A;
  }[]
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}
