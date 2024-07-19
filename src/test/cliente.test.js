import request from 'supertest';
import app from '../app'; 

// npm run test:client

describe('TEST GET CLIENTE', () => {
    it('deberia get cliente', async () => {
        const response = await request(app)
            .get('/api/cliente')
            .send({ id: 1 }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST POST CLIENTE', () => {
    it('deberia post cliente', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .send({ 
                nombre: 'Juan Mallqui Meza',
                correo: 'jmallqui@gmailcom',
                telefono: '991272971',
                direccionEnvio: 'Av. La Fontanas 286'
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST PUT CLIENTE', () => {
    it('deberia put cliente', async () => {
        const response = await request(app)
            .put('/api/cliente')
            .send({ 
                id: 1 ,
                nombre: 'Luis Mallqui Meza',
                correo: 'luismallqeui@gmailcom',
                telefono: '777666555',
                direccionEnvio: 'Av. Las Valencias 286'
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('TEST DELETE CLIENTE', () => {
    it('deberia delete cliente', async () => {
        const response = await request(app)
            .delete('/api/cliente')
            .send({ 
                id: 5 
             }) 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeDefined();
    });
});
