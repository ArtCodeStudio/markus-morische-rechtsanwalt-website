export interface StrapiRestAPIRequestOptions {
    url?: URL | string;
    populates?: string[];
    filters?: { $eg?: string };
}