const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async create(request, response) {

        const {id} = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response.status(400).json({
                message: 'No ONG found with this id'
            })
        }

        return response.status(200).json({
            metadata: ong
        });

    }

};
