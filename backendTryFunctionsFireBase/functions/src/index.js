const functions = require('firebase-functions');

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://adminfelipemongodb:admin123@cluster0-qgzxz.gcp.mongodb.net/test?retryWrites=true&w=majority',{
});
//Para o express entender que na aplicação utilizar Json na comunicação
app.use(express.json());
app.use(routes);

exports.app = functions.https.onRequest(app);