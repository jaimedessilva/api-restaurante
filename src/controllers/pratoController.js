const { readDatabase, writeDatabase } = require('../utils/dbAccess');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  const db = readDatabase();
  let pratos = db.pratos;

  // Filtros
  if (req.query.categoriaId) {
    pratos = pratos.filter(p => p.categoriaId === req.query.categoriaId);
  }

  if (req.query.destaque) {
    pratos = pratos.filter(p => p.destaque === (req.query.destaque === 'true'));
  }

  // Paginação
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = pratos.slice(start, end);

  res.json({
    total: pratos.length,
    page,
    limit,
    data: paginated
  });
};

exports.create = (req, res) => {
  const db = readDatabase();

  const novoPrato = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.pratos.push(novoPrato);
  writeDatabase(db);

  res.status(201).json(novoPrato);
};