import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { IPDetails, WhoisDetails } from './types';
import { resolveDomain } from './utils/basic';
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const IPINFO_API_KEY: string | undefined = process.env.IPINFO_API_KEY;

app.use(cors({
  origin: [`http://${process.env.SERVER_IP}:5173`, 'http://localhost:5173', 'http://127.0.0.1:5173'],
}));

// Function to get IP details using fetch
async function getIPDetails(ip: string): Promise<IPDetails> {
    try {
        const response = await fetch(`https://ipinfo.io/${ip}/json`);
        const data = (await response.json()) as IPDetails;
        return {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          postal: data.postal,
          loc: data.loc,
          org: data.org,
          timezone: data.timezone
        };
    } catch (error) {
        return { error: 'Failed to fetch IP details', ip };
    }
}

// Function to fetch WHOIS details
async function getWhoisDetails(query: string): Promise<WhoisDetails | { error: string }> {
  try {
    // Fetch data from ipinfo.io API
    const response = await fetch(`https://ipinfo.io/${query}/json?token=${IPINFO_API_KEY}`);
    const data = await response.json();
    return data
  } catch (error) {
    return { error: "Failed to fetch WHOIS data" };
  }
}

// WHOIS Lookup Endpoint
app.get('/whois', async (req: Request, res: Response): Promise<void> => {
  const query: string | undefined = req.query.query as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }
  
  // If query is a domain, resolve it to an IP
  let ip: string = query;
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(query)) {
    try {
      ip = await resolveDomain(query);
    } catch (error) {
      res.status(500).json({ error: 'Domain resolution failed' });
      return;
    }
  }

  const whoisData: WhoisDetails | {error: string} = await getWhoisDetails(ip);
  res.json(whoisData);
});



app.get('/lookup', async (req: Request, res: Response): Promise<void> => {
  try {
    const query: string | undefined = req.query.query as string;
    if (!query) {
      res.status(400).json({ error: 'Query parameter is required' });
      return;
    }
    
    let ip: string = query;
    // If query is a domain, resolve it to an IP
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(query)) {
      try {
        ip = await resolveDomain(query);
      } catch (error) {
        res.status(500).json({ error: 'Domain resolution failed' });
        return;
      }
    }
    // Fetch IP details
    const details: IPDetails = await getIPDetails(ip);
    res.json(details);
  } catch(err) {
    res.status(500).json({err: 'unknow Error'})
  }
});

// Conditionally Start the Server Only in Non-Test Mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export app for Testing
export { app }

