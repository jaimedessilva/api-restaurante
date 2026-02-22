const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();

server.use(express.json());

const caminhoArquivo = path.join(__dirname, 'pratos.json');

// Função para carregar pratos do arquivo
const carregarPratos = () => {
    try {
        if (fs.existsSync(caminhoArquivo)) {
            const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
            return JSON.parse(dados);
        }
    } catch (erro) {
        console.log('Erro ao carregar pratos:', erro);
    }
    return [];
}
// Função para salvar pratos no arquivo
const salvarPratos = (pratos) => {
    try {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(pratos, null, 2), 'utf-8');
    } catch (erro) {
        console.log('Erro ao salvar pratos:', erro);
    }
}
const nomeVazio = (req, res, next) => {
    const { nome } = req.body;
    if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome do prato é obrigatório' });
    }
    next();
}
const categoriaVazia = (req, res, next) => {
    const { categoria } = req.body;     
    if (!categoria || categoria.trim() === '') {
        return res.status(400).json({ error: 'Categoria do prato é obrigatória' });
    }
    next();
}
let pratos = carregarPratos();

//Route paramns
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Você solicitou o usuário com ID: ${id}`);
});

// Query Paramêtros
server.get('/search', (req, res) => {
    const { palavra } = req.query;
    res.send(`Você pesquisou por palavra: ${palavra}`);
});

server.get('/pratos', (req, res) => {
    res.json(pratos);
});
server.get('/pratos/:index', (req, res) => {
    const { index } = req.params;
    res.json(pratos[index]);
});
//enviar dados para o array
server.post('/pratos', nomeVazio, (req, res) => {
    const { nome, categoria } = req.body;
    const novoPrato = { id: String(pratos.length + 1), nome, categoria };
    pratos.push(novoPrato);
    salvarPratos(pratos);
    res.status(201).json(novoPrato);
});
//atualizar um prato
server.put('/pratos/:index', nomeVazio, (req, res) => {
    const { index } = req.params;
    const { nome, categoria } = req.body;
    pratos[index] = { id: pratos[index].id, nome, categoria };
    salvarPratos(pratos);
    res.json(pratos[index]);
});
//deletar um prato
server.delete('/pratos/:index', (req, res) => {
    const { index } = req.params;
    pratos.splice(index, 1);
    salvarPratos(pratos);
    res.json({ message: 'Prato deletado com sucesso' });
    res.status(204).send();
});

server.use((req, res, next) => {
    console.log(`Requisição chamada: ${req.method} ${req.url}`);
    next();
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});