const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://adminfelipemongodb:admin123@cluster0-qgzxz.gcp.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//Para o express entender que na aplicação utilizar Json na comunicação
app.use(express.json());
app.use(routes);

app.listen(3333);