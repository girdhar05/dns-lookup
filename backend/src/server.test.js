const request = require('supertest');
const {app} = require('../dist/server');
let server; // Store server instance

beforeAll((done) => {
    server = app.listen(4000, () => done()); // Start a fresh server for each test run
});

afterAll((done) => {
    server.close(() => done()); // Ensure server is properly closed after tests
});

describe('IP Lookup API Tests', () => {
    test('Should return IP details for a domain', async () => {
        const response = await request(server).get('/lookup?query=google.com');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('ip');
    });

    test('Should return details for an IP', async () => {
        const response = await request(server).get('/lookup?query=8.8.8.8');
        expect(response.status).toBe(200);
        expect(response.body.ip).toBe('8.8.8.8');
    });

    test('Should return error for missing query parameter', async () => {
        const response = await request(server).get('/lookup');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('Should return error for an invalid domain', async () => {
        const response = await request(server).get('/lookup?query=invalid.nonexistent');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});

describe('WHOIS API Tests', () => {
    test('Should return error for missing query parameter', async () => {
      const response = await request(server).get('/whois');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Query parameter is required');
    });
  
    test('Should return WHOIS details for a valid IP', async () => {
      // Using a valid IP should bypass the domain resolution logic
      const response = await request(server).get('/whois?query=8.8.8.8');
      expect(response.status).toBe(200);
      // Check that the returned data includes the same IP
      expect(response.body).toHaveProperty('ip', '8.8.8.8');
      // Optionally, verify other WHOIS details if known
    });
  
    test('Should return WHOIS details for a valid domain', async () => {
      // Using a valid domain that will be resolved to an IP
      const response = await request(server).get('/whois?query=google.com');
      expect(response.status).toBe(200);
      // Check that an IP property is present in the response
      expect(response.body).toHaveProperty('ip');
      // Optionally, verify that the resolved IP is in the correct format
      expect(response.body.ip).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
    });
  
    test('Should return error for domain resolution failure', async () => {
      // Use an invalid domain that should trigger a resolution failure
      const response = await request(server).get('/whois?query=invalid.nonexistent');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Domain resolution failed');
    });
});
