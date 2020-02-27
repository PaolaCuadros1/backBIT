/**
 * En este archivo nos vamos a conectar a nuestra DB, para esto vamos a usar mongoose: npm install mongoose --save
 */

const mongoose = require('mongoose');
const app = require('./app');
const port = 4200;

//Puerto por defecto donde se escucha mongo: 27017
mongoose.connect('mongodb://localhost:27017/user', { useFindAndModify: false }, (error, res) => {
  if (error) {
    console.log("Error al conectarnos->" + error);
  } else {
    console.log("Nos conectamos correctamente");
    app.listen(port, () => {
      console.log('Puerto:--> ' + port);
    })
  }
})