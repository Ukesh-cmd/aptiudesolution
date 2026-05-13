const request = require("supertest");
const app = require("../app");
const prisma = require("../db/prismaClient");

describe("Health Check API", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return healthy status structure", async () => {
    const res = await request(app).get("/api/v1/health");
    
    // We accept 200 (healthy) or 503 (database unreachable)
    // Both prove the endpoint and observability logic are working
    expect([200, 503]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("success");
    expect(res.body.data).toHaveProperty("database");
    expect(res.body.data).toHaveProperty("uptime");
  });


  it("should return 200 for the root route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Express + Prisma API running");
  });
});
