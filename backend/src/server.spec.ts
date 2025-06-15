import request from 'supertest';
import app from './server'; 
import testData from './data/Data.json';

describe('Task 10: Test for Basic Endpoint', () => {
  it('should return 200 OK and all opportunities with no query params', async () => {
    // Make a request to the endpoint.
    const response = await request(app).get('/api/Data');

    //Check the results.
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(testData.length); 
    expect(response.body).toEqual(testData);
  });
});
