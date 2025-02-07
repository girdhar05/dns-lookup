import dns from 'dns';

export async function resolveDomain(domain: string): Promise<string> {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { family: 4 }, (err, address) => {
      if (err) reject(err);
      else resolve(address);
    });
  });
}