const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        try {

            const { title, description, value} = request.body;
            const ong_id = request.headers.authorization;

            const [id] = await connection('incidents').insert({
                titulo: title,
                description,
                value,
                ong_id
            });

            return response.status(200).json({
                message: 'Incident cadastrado com sucesso',
                metadata: id,
                status: true
            });

        }
        catch (erro) {
            return response.status(417).json({
                message: 'Problemas ao cadastrar incident: ' + erro.message,
                status: false
            });
        }
    },

    async index(request, response) {
        const {ong_id} = request.params;
        const incident = await connection('incidents')
            .where('ong_id', ong_id);

        return response.status(200).json({
            message: 'Incidents',
            metadata: incident,
            status: true
        });
    },

    async list(request, response) {

        const {page = 1} = request.query;

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id' )
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.status(200).json({
            message: 'Incidents',
            metadata: {
                dados: incidents,
                total: count['count(*)']
            },
            status: true
        });
    },

    async delete(request, response) {

        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if( incident.ong_id !== ong_id) {
            return response.status(401).json({
                message: 'Operação não permitida',
                erro: 'Não autorizado',
                status: false
            });
        }

        try {
            await connection('incidents')
                .where('id', id)
                .delete();

            return response.status(204).send();
        }
        catch (erro) {
            return response.status(401).json({
                message: 'Problemas ao tentar remover caso: ' + id,
                erro: erro.message,
                status: false
            });
        }

    }

};
