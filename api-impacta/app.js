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
    encrypt: false, // Se você estiver usando criptografia (recomendado para conexões remotas)
  },
};

app.post('/cadastrar', async (req, res) => {
  const { NomedoProduto, Descricao, Quantidade, PrecoUnitario} = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();

    // Execute uma instrução SQL de inserção na sua tabela

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

app.get('/buscar', async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    // Execute uma instrução SQL de seleção na sua tabela
    const query = 'SELECT * FROM sua_tabela;';
    const result = await request.query(query);

    res.json(result.recordset); // Retorna os itens do banco de dados
  } catch (error) {
    console.error('Erro ao buscar itens no banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});