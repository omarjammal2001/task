const request = require('supertest');
const app = require('./index.js'); // Replace with the path to your app file

    describe('API Tests', () => {
        beforeAll(() => {
            jest.setTimeout(10000); // Set timeout to 10 seconds (10000 milliseconds)
          });
        
  describe('POST /validate', () => {
    it('should validate a number', async () => {
      const response = await request(app)
        .post('/validate')
        .send({ number: '96178871728' });

      expect(response.statusCode).toBe(200);
      const { status_message } = response.body;
      expect(status_message).toBe('Success');
    });
  });

  describe('POST /add', () => {
    it('should add an item with a valid number', async () => {
      const response = await request(app)
        .post('/add')
        .send({
          name: 'Test Item',
          description: 'Test Description',
          mobile: '96178871728',
          category: 'Test Category'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('Item added');
    });

  });

  describe('POST /update', () => {
    it('should update an item with a valid number', async () => {
      const response = await request(app)
        .post('/update')
        .send({
          id: '6476330d3c600d24f3a726c2',
          updatedName: 'Updated Item',
          updatedDescription: 'Updated Description',
          updatedMobile: '96178871728',
          updatedCategory: 'Updated Category'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('Item updated');
    });

  });

  describe('DELETE /delete', () => {
    it('should delete an item', async () => {
      const response = await request(app)
        .delete('/delete')
        .send({ id: '64764d711b2d674e33ecb40f' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('Item deleted');
    });
  });

  describe('GET /all-items', () => {
    it('should get all items', async () => {
      const response = await request(app).get('/all-items');

      expect(response.statusCode).toBe(200);
      // Add assertions for the response body as per your requirements
    });
  });
});
