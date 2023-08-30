const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors());
app.use(express.json());

let createItems = [];
let idCounter = 1;

// Create
app.post('/cadastrar', (req, res) => {
  const { NomedoProduto, Descricao, Quantidade,
    PrecoUnitario } = req.body;
  const createItem = {
    Codigo: idCounter++,
    NomedoProduto,
    Descricao,
    Quantidade,
    PrecoUnitario
  };
  createItems.push(createItem);
  console.log(createItem); // na versão de entrega, retirar console.log
  res.status(201).json(createItem);
});

// Read
app.get('/buscar', (req, res) => {
  res.json(createItems);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
