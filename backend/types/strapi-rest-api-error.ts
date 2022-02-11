export interface StrapiRestAPIError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}
