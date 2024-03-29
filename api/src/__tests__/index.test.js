const request = require('supertest');
const app     = require('../index');

describe('Get articles', () => {
  it('Debe recibir los datos del api', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('Cantidad de datos del API (100)', async() => {
    const res = await request(app).get('/');
    expect(res.body['data'].length).toBe(100);
  });

  it('Valida los 3 campos requeridos',async () => {
    const res = await request(app).get('/');
    const obj = res.body['data'][0];
    const keys = Object.keys(obj);

    expect(keys).toEqual(['title', 'url', 'imageUrl']);
  });

  it('ruta erronea', async() => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(404);
  });
})