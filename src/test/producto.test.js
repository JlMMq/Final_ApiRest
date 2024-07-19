import request from 'supertest';
import app from '../app'; 

// npm run test:producto

describe('TEST GET PRODUCTO', () => {
    it('deberia get producto', async () => {
        const response = await request(app)
            .get('/api/producto')
            .send({ id: 1 }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});


describe('TEST POST PRODUCTO', () => {
    it('deberia post producto', async () => {
        const response = await request(app)
            .post('/api/producto')
            .send({ 
                nombre: 'Laptop HP OEM',
                descripcion: 'Laptop i7 de 19 pulgadas',
                precio: 7500,
                stock: 3 ,
                idCategoria: 1
            }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST PUT PRODUCTO', () => {
    it('deberia put producto', async () => {
        const response = await request(app)
            .put('/api/producto')
            .send({ 
                id : 3,
                nombre: 'Laptop HP OEM',
                descripcion: 'Laptop i7 de 19 pulgadas',
                precio: 6500,
                stock: 4 ,
                idCategoria: 2
            }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST DELETE PRODUCTO', () => {
    it('deberia delete producto', async () => {
        const response = await request(app)
            .delete('/api/producto')
            .send({ 
                id : 6
            }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});