import request from 'supertest';
import app from '../app'; 

// npm run test:categoria

describe('TEST GET LISTADO CATEGORIAS', () => {
    it('deberia get listado categorias', async () => {
        const response = await request(app)
            .get('/api/categorias')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST GET CATEGORIA', () => {
    it('deberia get categoria', async () => {
        const response = await request(app)
            .get('/api/categoria')
            .send({ id: 1 }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});


describe('TEST POST CATEGORIA', () => {
    it('deberia post categoria', async () => {
        const response = await request(app)
            .post('/api/categoria')
            .send({ 
                nombre: "LAPTOPS",
                descripcion: "Laptops de ultima generacion"
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST PUT CATEGORIA', () => {
    it('deberia put categoria', async () => {
        const response = await request(app)
            .put('/api/categoria')
            .send({ 
                id: 5,
                nombre: "MEMORIAS",
                descripcion: "Memorias de ultima generacion"
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST DELETE CATEGORIA', () => {
    it('deberia delete categoria', async () => {
        const response = await request(app)
            .delete('/api/categoria')
            .send({ 
                id: 6
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});