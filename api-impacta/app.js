const express = require('express');
const app = express();
const PORT = 5000;

//TO DO Verificar se necessita mais alguma importação
// Configurar os cabeçalhos CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000'); // Permitir a origem
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
  next();
});

app.use(express.json());

let createItems = [];
let idCounter = 1;

// Create
app.post('/tasks', (req, res) => {
  const { nomedoProduto, descricao, quantidade,
    precoUnitario } = req.body;
  const createItem = {
    Codigo: idCounter++,
    nomedoProduto,
    descricao,
    quantidade,
    precoUnitario
  };
  createItems.push(createItem);
  console.log(createItem); // na versão de entrega, retirar console.log
  res.status(201).json(createItem);
});

// Read
app.get('/tasks', (req, res) => {
  res.json(createItems);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
