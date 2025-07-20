import request from 'supertest';
import express from 'express';
import cors from 'cors';
import routes from '../src/routes/courses.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/courses', routes);

describe('GET /courses', () => {
  it('deve retornar os dados esperados com status 200', async () => {
    const response = await request(app).get('/courses/');

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');

    expect(response.body).toHaveProperty('vehicle');
    expect(response.body).toHaveProperty('courses');
    expect(Array.isArray(response.body.courses)).toBe(true);
    expect(response.body.courses.length).toBeGreaterThan(0);

    expect(response.body.vehicle).toHaveProperty('plate');
    expect(response.body.vehicle).toHaveProperty('vin');
    expect(response.body.vehicle).toHaveProperty('picture');
  });
});
