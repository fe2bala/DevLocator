const { Router } = require('express');
const DevController = require('./controllers/DevController')


const routes = Router();
routes.get('/Devs',DevController.index);
routes.post('/Devs', DevController.store);
module.exports = routes;


//Query params: request.query rota/?search=valor 
//Route params: request.params rota/:params identificar um recurso
//Body: request.body (Dados no corpo da requisicao)
