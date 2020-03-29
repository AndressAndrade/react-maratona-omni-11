const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        try {

            const { name, email, whatsapp, city, uf} = request.body;
            const id = crypto.randomBytes(4).toString('HEX');

            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });

            return response.status(200).json({
                message: 'Ong cadastrada com sucesso',
                metadata: id,
                status: true
            });

        }
        catch (erro) {
            return response.status(417).json({
                message: 'Problemas ao cadastrar ONG: ' + erro.message,
                status: false
            });
        }
    },

    async list(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.status(200).json({
            message: 'Ongs',
            metadata: ongs,
            status: true
        });
    }

};
