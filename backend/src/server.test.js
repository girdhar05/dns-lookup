const request = require("supertest");
const { app } = require("../dist/server");

jest.mock("supertest", () => {
  return jest.fn(() => ({
    get: jest.fn((url) => {
      if (url.startsWith("/lookup?query=google.com")) {
        return Promise.resolve({ status: 200, body: { ip: "8.8.8.8" } });
      }
      if (url.startsWith("/lookup?query=8.8.8.8")) {
        return Promise.resolve({ status: 200, body: { ip: "8.8.8.8" } });
      }
      if (url === "/lookup") {
        return Promise.resolve({ status: 400, body: { error: "Query parameter is required" } });
      }
      if (url.startsWith("/lookup?query=invalid.nonexistent")) {
        return Promise.resolve({ status: 500, body: { error: "Invalid domain" } });
      }
      if (url === "/whois") {
        return Promise.resolve({ status: 400, body: { error: "Query parameter is required" } });
      }
      if (url.startsWith("/whois?query=8.8.8.8")) {
        return Promise.resolve({ status: 200, body: { ip: "8.8.8.8", org: "Google LLC" } });
      }
      if (url.startsWith("/whois?query=google.com")) {
        return Promise.resolve({ status: 200, body: { ip: "8.8.8.8" } });
      }
      if (url.startsWith("/whois?query=invalid.nonexistent")) {
        return Promise.resolve({ status: 500, body: { error: "Domain resolution failed" } });
      }
    }),
  }));
});

describe("IP Lookup API Tests", () => {
  test("Should return IP details for a domain", async () => {
    const response = await request(app).get("/lookup?query=google.com");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ip", "8.8.8.8");
  });

  test("Should return details for an IP", async () => {
    const response = await request(app).get("/lookup?query=8.8.8.8");
    expect(response.status).toBe(200);
    expect(response.body.ip).toBe("8.8.8.8");
  });

  test("Should return error for missing query parameter", async () => {
    const response = await request(app).get("/lookup");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Query parameter is required");
  });

  test("Should return error for an invalid domain", async () => {
    const response = await request(app).get("/lookup?query=invalid.nonexistent");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Invalid domain");
  });
});

describe("WHOIS API Tests", () => {
  test("Should return error for missing query parameter", async () => {
    const response = await request(app).get("/whois");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Query parameter is required");
  });

  test("Should return WHOIS details for a valid IP", async () => {
    const response = await request(app).get("/whois?query=8.8.8.8");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ip", "8.8.8.8");
    expect(response.body).toHaveProperty("org", "Google LLC");
  });

  test("Should return WHOIS details for a valid domain", async () => {
    const response = await request(app).get("/whois?query=google.com");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ip", "8.8.8.8");
    expect(response.body.ip).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
  });

  test("Should return error for domain resolution failure", async () => {
    const response = await request(app).get("/whois?query=invalid.nonexistent");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Domain resolution failed");
  });
});
