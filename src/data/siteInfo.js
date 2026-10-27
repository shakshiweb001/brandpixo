// Single place for business details that appear on the site and in structured data.
// Only add values that are real: empty fields are simply left out everywhere.

export const siteInfo = {
  // Real profile URLs only, e.g. { network: 'instagram', url: 'https://www.instagram.com/<handle>' }.
  // Supported networks: 'instagram', 'facebook', 'linkedin'. Icons only render for entries listed here.
  socials: [],

  // Fill in the business address once it is confirmed (it is also emitted in the schema).
  address: { street: '', locality: '', region: '', postalCode: '', country: 'India' },
};

// "City, State, India" with whatever is known.
export const locationLabel = () => {
  const { locality, region, country } = siteInfo.address;
  return [locality, region, country].filter(Boolean).join(', ');
};
