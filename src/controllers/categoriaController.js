const { readDatabase, writeDatabase } = require('../utils/dbAccess');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  const db = readDatabase();
  res.json(db.categorias);
};

exports.create = (req, res) => {
  const db = readDatabase();

  const novaCategoria = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  db.categorias.push(novaCategoria);
  writeDatabase(db);

  res.status(201).json(novaCategoria);
};

exports.update = (req, res) => {
  const db = readDatabase();
  const index = db.categorias.findIndex(c => c.id === req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Categoria não encontrada" });

  db.categorias[index] = {
    ...db.categorias[index],
    ...req.body
  };

  writeDatabase(db);
  res.json(db.categorias[index]);
};

exports.remove = (req, res) => {
  const db = readDatabase();
  db.categorias = db.categorias.filter(c => c.id !== req.params.id);
  writeDatabase(db);

  res.json({ message: "Categoria removida com sucesso" });
};