export interface IPDetails {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  org?: string;
  loc?: String;
  timezone?: string;
  error?: string;
}

interface AsnInfo {
  asn: string;
  name: string;
  domain: string;
  route: string;
  type: string;
}

interface CompanyInfo {
  name: string;
  domain: string;
  type: string;
}

interface PrivacyInfo {
  vpn: boolean;
  proxy: boolean;
  tor: boolean;
  relay: boolean;
  hosting: boolean;
  service: string;
}

interface AbuseInfo {
  address: string;
  country: string;
  email: string;
  name: string;
  network: string;
  phone: string;
}

interface DomainsInfo {
  ip: string;
  total: number;
  domains: string[];
}


export interface WhoisDetails {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  postal?: string;
  timezone?: string;
  anycast?: boolean;
  asn?: AsnInfo;
  company?: CompanyInfo;
  privacy?: PrivacyInfo;
  abuse?: AbuseInfo;
  domains?: DomainsInfo;
  [key: string]: any; // Allow additional properties
}
