const { Router } = require('express');

const { HomeController, DevController, SearchController } = require('./controllers');

const { httpLogger } = require('./middlewares');


const routes = Router();
//Middlewares
routes.use(httpLogger);

//Routes

//Devs
routes.get('/devs', DevController.index);
routes.put('/devs/:id', DevController.update);
routes.post('/devs', DevController.store);
routes.delete('/devs/:id', DevController.destroy);

//Search
routes.get('/search', SearchController.index);

//Home
routes.get('*',HomeController.index);

module.exports = routes;


//Query params: request.query rota/?search=valor 
//Route params: request.params rota/:params identificar um recurso
//Body: request.body (Dados no corpo da requisicao)
