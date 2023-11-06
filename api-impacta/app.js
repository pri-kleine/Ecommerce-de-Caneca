const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mssql');
const PORT = 5000;

app.use(cors());
app.use(express.json());

const config = {
  server: 'DESKTOP-0EFMBNU\\SQLEXPRESS',
  user: 'sa2',
  password: 'sa2',
  database: 'Canecas',
  port: 1433,
  options: {
    encrypt: false, 
  },
};

app.post('/cadastrar', async (req, res) => {
  const { NomedoProduto, Descricao, Quantidade, PrecoUnitario } = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();

    const query = `
  INSERT INTO Produtos (Nome, Descricao, QTD, Preco)
  VALUES ('${NomedoProduto}', '${Descricao}', ${Quantidade}, 
  ${PrecoUnitario});
`;

    const result = await request.query(query);
    const query2 = 'SELECT TOP 1 * FROM Produtos ORDER BY Codigo DESC;';
    const result2 = await request.query(query2);

    res.status(201).json(result2.recordset[0]); // Retorna o item criado
  } catch (error) {
    console.error('Erro ao inserir item no banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    sql.close();
  }
  console.log('Fim da operação');
});

app.post('/buscar', async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const { NomedoProduto} = req.body;
    console.log (req.body);

    let query;
    if (NomedoProduto){
      query = `SELECT * FROM Produtos WHERE Nome LIKE '%${NomedoProduto}%'`;
    } else {
      query = `SELECT * FROM Produtos`;
    }
    const result = await request.query(query);
    console.log('HA', result.recordset);
    res.status(200).json(result.recordset); // Retorna os itens do banco de dados
  } catch (error) {
    console.error('Erro ao buscar itens no banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    sql.close();
  }
});

app.post('/editar', async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const { Codigo, Quantidade} = req.body;
    console.log (req.body);

    let query;
    query = `UPDATE Produtos SET QTD=${Quantidade} WHERE Codigo = ${Codigo}`
    console.log("Query " + query);
    await request.query(query);
    res.status(202).json({});
  } catch (error) {
    console.error('Erro ao editar quantidade no banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    sql.close();
  }
});

app.delete('/deletar:Codigo', async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const { Codigo } = req.params;

    let query = `DELETE FROM Produtos WHERE Codigo = ${Codigo}`;
    
    console.log("Query: " + query);

    await request.query(query);
    res.status(204).json({});
  } catch (error) {
    console.error('Erro ao deletar registro no banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

