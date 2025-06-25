const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  test('GET / should return server info', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Claude Dev Test Server');
    expect(response.body.version).toBe('1.0.0');
  });

  test('GET /api/health should return health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(typeof response.body.uptime).toBe('number');
  });

  test('GET /api/test should return test data', async () => {
    const response = await request(app).get('/api/test?param=value');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Test endpoint working');
    expect(response.body.params.param).toBe('value');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route not found');
  });
});