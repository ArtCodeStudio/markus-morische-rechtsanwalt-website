/** @see https://schema.org/Person */
export interface SEOSchemaPerson {
  "@context": "https://schema.org",
  "@type": "Person",
  /** Physical address of the item. */
  address: {
    "@type": "PostalAddress",
    /** The locality in which the street address is, and which is in the region. For example, Mountain View. */
    addressLocality?: string;
    /** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level Administrative division */
    addressRegion?: string;
    postalCode: string;
    streetAddress: string;
  },
  email?: string;
  image?: string;
  jobTitle?: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  telephone?: string;
  faxNumber?: string;
  url?: string;
}
