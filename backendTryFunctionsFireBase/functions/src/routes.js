const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router();
routes.get('/devs', DevController.index);
routes.put('/devs/:id', DevController.update);

routes.post('/devs', DevController.store);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

routes.get('/',(rep,res)=>{
    return res.json({message:'Hello'})
});

module.exports = routes;


//Query params: request.query rota/?search=valor 
//Route params: request.params rota/:params identificar um recurso
//Body: request.body (Dados no corpo da requisicao)
