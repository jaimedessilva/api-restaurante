const express = require('express');
const cors = require('cors');

const categoriaRoutes = require('./routes/categoriaRoutes');
const pratoRoutes = require('./routes/pratoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use('/categorias', categoriaRoutes);
app.use('/pratos', pratoRoutes);
app.use('/pedidos', pedidoRoutes);

module.exports = app;