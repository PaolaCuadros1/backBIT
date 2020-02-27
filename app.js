/**
 * En este archivo vamos a crear la logica de expressJS.
 * Debemos instalar express: npm install express --save
 * Debemos instalar body-parser: npm install body-parser --save. El cual nos permite analizar los datos que se envian desde la url.
 */

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./rutas/userRoutes');

const app = express();

app.use(bodyParser.json()) //Analizar los datos que se pasan por la url.

app.use('/api', routes);
module.exports = app;