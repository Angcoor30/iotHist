const express = require('express');
const res = require('express/lib/response');
const userRoutes = require("./routes/user");
const mongoose = require('mongoose');
const { db } = require('./models/user');
require("dotenv").config(); //para hacer variables custom instalar dependeica npm i dotenv
const app = express();
const port = process.env.PORT || 9000;
const dbname = "Employee";
//middlewares
app.use(express.json());
app.use('/api',userRoutes);
app.get("/sensors",(req, res) =>
{
  let sensores = []
  db.collection('sensores')
  .find()
  .sort({tipo:1})
  .forEach(sensor => sensores.push(sensor))
  .then(()=>{
    res.status(200).json(sensores)
  })
  .catch(()=>{
    res.status(500).json({error: 'No Encontrado'})
  })
  
});

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Conectado A base de datos'))
.catch((error) => console.error(error));
app.listen(port, () => console.log('sever listening on port', port));