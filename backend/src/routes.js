const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Listar ONGs
routes.get('/ongs', OngController.list);
// Criar Ongs
routes.post('/ongs', OngController.create);

// Listar Casos
routes.get('/incidents', IncidentController.list);
// Listar Casos de uma ong
routes.get('/incidents/:ong_id', IncidentController.index);
// Criar Casos
routes.post('/incidents', IncidentController.create);
// Remover Casos
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
