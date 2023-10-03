

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

function buscarItem(pagina) {
    document.body.setAttribute()
    var nomedoProduto = document.getElementById("nomeProduto").value;
    console.log(nomedoProduto);

    fetch('http://localhost:5000/buscar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({NomedoProduto: nomedoProduto}),
    })
    .then(response => {
        if (response.status === 201) {
            console.log('Item buscado com sucesso!');
            console.log(nomedoProduto);
        } else {
            console.error('Erro ao buscar o item.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

// Código JavaScript para a tela de listagem (em listagem.html)
document.getElementById("listarButton").addEventListener("click", function () {
    // Aqui você pode adicionar a lógica para listar os produtos cadastrados.
    // Você pode recuperar os dados de onde os armazenou (por exemplo, de um array).

    // Após listar os produtos, você pode preencher a tabela com os dados.

    alert("Listagem de produtos.");
});

document.getElementById("voltarButton").addEventListener("click", function () {
    // Redirecionar de volta para a tela de cadastro
    window.location.href = "index.html";
});


