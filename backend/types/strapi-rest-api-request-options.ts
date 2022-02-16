export interface StrapiRestAPIRequestOptions {
    url?: URL | string;
    query?: {
        fields?: string[];
        populate?: any;
        filters?: {
            [prop: string]: {
                $eq?: string
            }
        };
    }

}