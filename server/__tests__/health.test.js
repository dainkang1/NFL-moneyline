import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('server health endpoint', () => {
  it('GET /api/health returns ok true', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    expect(res.body).toHaveProperty('sport');
  });
});

