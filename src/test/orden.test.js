import request from 'supertest';
import app from '../app'; 

// npm run test:orden

describe('TEST GET ORDEN', () => {
    it('deberia get orden', async () => {
        const response = await request(app)
            .get('/api/orden')
            .send({ id: 4 }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST POST ORDEN', () => {
    it('deberia post orden', async () => {
        const response = await request(app)
            .post('/api/orden')
            .send({ 
                idCliente: 1,
                detalle: [
                {
                    idProducto: 1, 
                    cantidad: 1
                },
                {
                    idProducto: 2, 
                    cantidad: 2
                }
                ]
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST PUT ORDEN', () => {
    it('deberia put orden', async () => {
        const response = await request(app)
            .put('/api/orden')
            .send({ id: 4,
                idEstado: 3
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

//Tiene que estar en estado 3 o 4 para ser eliminado
describe('TEST DELETE ORDEN', () => {
    it('deberia delete orden', async () => {
        const response = await request(app)
            .delete('/api/orden')
            .send({ 
                id: 6
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});
