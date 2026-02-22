const { readDatabase, writeDatabase } = require('../utils/dbAccess');
const { v4: uuidv4 } = require('uuid');

exports.create = (req, res) => {
  const db = readDatabase();

  const { itens } = req.body;

  if (!itens || !Array.isArray(itens)) {
    return res.status(400).json({ message: "Itens inválidos" });
  }

  const pedido = {
    id: uuidv4(),
    itens,
    status: "PENDENTE",
    createdAt: new Date().toISOString()
  };

  db.pedidos.push(pedido);
  writeDatabase(db);

  res.status(201).json(pedido);
};

exports.getAll = (req, res) => {
  const db = readDatabase();
  res.json(db.pedidos);
};