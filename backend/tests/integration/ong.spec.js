const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Irmãos",
                email: "contato@irmao.com.br",
                whatsapp: "71123456789",
                city: "Salvador",
                uf: "BA"
            });

        expect(response.body).toHaveProperty('metadata');
        expect(response.body.metadata).toHaveLength(8);

    });
});
