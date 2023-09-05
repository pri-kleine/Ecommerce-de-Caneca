const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mssql');
const PORT = 5000;

app.use(cors());
app.use(express.json());

var Connection = require('tedious').Connection;  
    var config = {  
        server: 'DESKTOP-VCFCMNE',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'sa', //update me
                password: 'michele'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'Canecas'},
        };
  
        sql.connect(config)
        .then(() => {
        console.log('Conexão bem-sucedida com o banco de dados SQL Server');
        })
        .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
        });        

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


