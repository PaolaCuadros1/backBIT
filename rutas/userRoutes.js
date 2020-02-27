const express = require('express');
const UserController = require('../controllers/UserController');

var api = express.Router();

/*
    A través de las características de una API tenemos acceso
    a los métodos POST, GET, PUT y DELETE. Estos métodos nos van 
    a permitir Agregar datos (POST), obtener datos (GET),
    actualizar datos (PUT) y eliminar datos (DELETE). Estos métodos
    los provee el protocolo HTTP
*/

api.post('/createUser', UserController.create);

/**
 * Como vamos a actualizar, el método que debemos usar es PUT.
 * /:id -> Es el id del usuario, este lo debemos enviar por la url, ejemplo: http://localhost:4200/api/updateUser/idDelUsuario
 */
api.put('/updateUser/:id', UserController.update);

api.post('/login', UserController.login); //Cuando es información privada, como contraseñas NO podemos usar get, ya que con este método enviamos los datos por la url.

api.delete('/removeUser/:id', UserController.remove); //Como vamos a eliminar, usamos el método delete.

module.exports = api;