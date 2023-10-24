
function cadastrarItem() {
    var nomedoProduto = document.getElementById("nomeProduto").value;
    var descricao = document.getElementById("descricao").value;
    var quantidade = parseInt(document.getElementById("quantidade").value);
    var precoUnitario = parseFloat(document.getElementById("precoUnitario").value);
    console.log(nomedoProduto);
    console.log(descricao);
    console.log(quantidade);
    console.log(precoUnitario);

    var itemData = { NomedoProduto: nomedoProduto, Descricao: descricao, Quantidade: quantidade, PrecoUnitario: precoUnitario };

    console.log(itemData);

    fetch('http://localhost:5000/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
        .then(response => {
            if (response.status === 201) {
                console.log('Item cadastrado com sucesso!');
            } else {
                console.error('Erro ao cadastrar o item.');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

function buscarItem() {
    var nomedoProduto = document.getElementById("nomeProduto").value;

    fetch('http://localhost:5000/buscar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NomedoProduto: nomedoProduto }),
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.error('Erro ao buscar o item.');
            return [];
        }
    })
    .then(data => {
        const tabelaProdutos = document.getElementById('tabelaProdutos');
        tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados

        if (data.length === 0) {
            tabelaProdutos.innerHTML = '<tr><td colspan="4">Nenhum produto encontrado.</td></tr>';
        } else {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td id= 'valor_nome${item.Nome}'>${item.Nome}</td>
                    <td id= 'valor_descricao${item.Nome}'>${item.Descricao}</td>
                    <td id= 'valor_QTD${item.Nome}'>${item.QTD}</td>
                    <td id= 'valor_Preco${item.Nome}'>${item.Preco}</td>
                    <td> <button type='button' id='botao_editar${item.Nome}' onclick='editar_registro( )'>Editar</button> </td>
                    <td> <button type='button' id='botao_salvar${item.Nome}'>Salvar</button> </td>
                `;
                tabelaProdutos.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function editar_registro(valor_nome$){
    console.log('Acessou o editar:' + valor_nome$)
    // document.getElementById('valor id'+ nomedoProduto);
};