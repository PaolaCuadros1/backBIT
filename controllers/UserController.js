const User = require('../models/User');
const crypto = require('crypto'); //npm install crypto --save
const algorithm = 'aes-256-cbc'; //Estandar de encriptación: https://pablo.sarubbi.com.ar/sysadmin/aes-como-funciona-sus-variantes-y-aplicacion-practica-con-openssl-y-php

function create(req, res) {
  var user = new User();
  var params = req.body;

  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.email = params.email;

  user.save((error, userCreated) => {
    if (error) {
      //Error en el servidor.
      res.status(500).send({
        message: "Error al crear el usuario"
      })
    } else {
      if (!userCreated) {
        // 404 -> Error al encontrar la pagina 
        res.status(404).send({
          message: "No se pudo crear el usuario"
        });
      } else {
        // 200 -> OK
        res.status(200).send({
          message: "Usuario creados correctamente",
          user: userCreated
        });
      }
    }
  })
}

function update(req, res) {
  var params = req.body;
  var id = req.params.id;


  /**
   * Este método lo vamos a hacer después de haber creado y probado la función de actualizar.
   */
  if (params.password !== undefined && params.password !== '') {
    //Algoritmo de encriptación
    //Código secreto, puede ser la misma contraseña.
    var key = crypto.createCipher(algorithm, '123sfdsds##%&/');
    var password = key.update(params.password, 'utf8', 'hex')
    password += key.final('hex');
    params.password = password;
  }

  /**
   * Actualizar datos.
   * El método: findByIdAndUpdate nos permite buscar un usuario y pasarle los parametros para actualizarlos.
   * La estructura es: colleccion.findByIdAndUpdate( 'A quien se debe buscar y actualizar', 'Que se debe actualizar.' )
   */
  User.findByIdAndUpdate(id, params, (error, userUpdated) => {
    if (error) {
      res.status(500).send({
        message: "Error en el servidor"
      })
    } else {
      if (!userUpdated) {
        res.status(404).send({
          message: "No se pudo actualizar el usuario"
        })
      } else {
        res.status(200).send({
          message: "Usuario actualizado correctamente",
          user: userUpdated
        })
      }
    }
  })
}

function login(req, res) {
  var params = req.body;
  var email = params.email;
  User.findOne({ email: email.toLowerCase() }, (error, userLogged) => {
    if (error) {
      res.status(500).send({
        message: "Error en el servidor"
      })
    } else {
      if (!userLogged) {
        res.status(400).send({
          message: "El usuario no existe"
        })
      } else {
        /**
         * Se debe encriptar de nuevo porque es un error de seguridad desencriptar la contraseña.
         */
        var key = crypto.createCipher(algorithm, algorithm);
        var password = key.update(params.password, 'utf8', 'hex')
        password += key.final('hex');

        if (password === userLogged.password) {
          res.status(200).send({
            message: "Los datos son correctos!!!"
          })
        } else {
          res.status(200).send({
            message: "La contraseña es incorrecta"
          })
        }
      }
    }
  })
}

function remove(req, res){
  User.findByIdAndRemove(req.params.id, (error, userDeleted)=>{
    if (error){
      res.status(500).send({
        message: "Error en el servidor"
      })
    }else{
      if (!userDeleted){
        res.status(200).send({
          message: "El usuario no existe"
        })
      }else{
        res.status(200).send({
          message: "Usuario eliminado correctamente."
        })
      }
    }
  })

}

//Debemos exportar todos los módulos que vamos a necesitar.
module.exports = {
  create,
  update,
  login,
  remove
}