const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'database.json');

//DB Inicial
function readDatabase() {
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
}

// Função para salvar banco
function writeDatabase(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
app.get('/', (req, res) => {
  res.send(`API Restaurante Rodando!
    Endpoints disponíveis:
    - GET /categorias
    - GET /categorias/:id
    - GET /pratos
    - GET /pratos/:id
    - GET /categorias/:id/pratos
    - POST /pedidos`);
});

/* Categorias */
app.get('/categorias', (req, res) => {
  const db = readDatabase();
  res.json(db.categorias);
});

app.get('/categorias/:id', (req, res) => {
  const db = readDatabase();
  const categoria = db.categorias.find(c => c.id === req.params.id);

  if (!categoria) {
    return res.status(404).json({ message: 'Categoria não encontrada' });
  }

  res.json(categoria);
});

/*Pratos*/
app.get('/pratos', (req, res) => {
  const db = readDatabase();
  res.json(db.pratos);
});

app.get('/pratos/:id', (req, res) => {
  const db = readDatabase();
  const prato = db.pratos.find(p => p.id === req.params.id);

  if (!prato) {
    return res.status(404).json({ message: 'Prato não encontrado' });
  }

  res.json(prato);
});

// Filtrar por categoria
app.get('/categorias/:id/pratos', (req, res) => {
  const db = readDatabase();
  const pratos = db.pratos.filter(p => p.categoriaId === req.params.id);
  res.json(pratos);
});

/* Pedidos */
app.get('/pedidos', (req, res) => {
  const db = readDatabase();
  res.json(db.pedidos);
});

app.post('/pedidos', (req, res) => {
  const db = readDatabase();

  const { itens } = req.body;

  if (!itens || !Array.isArray(itens)) {
    return res.status(400).json({ message: 'Itens inválidos' });
  }

  const pedido = {
    id: uuidv4(),
    itens,
    status: 'PENDENTE',
    createdAt: new Date().toISOString()
  };

  db.pedidos.push(pedido);
  writeDatabase(db);

  res.status(201).json(pedido);
});

/*Iniciar Servidor*/
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});