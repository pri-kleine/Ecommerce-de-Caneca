
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
                    <td>${item.Nome}</td>
                    <td>${item.Descricao}</td>
                    <td id="${item.Codigo}">${item.QTD}</td>
                    <td>${item.Preco}</td>
                `;
                tabelaProdutos.appendChild(row);
            });
            makeEditable()
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function sendNewValue(codigo, quantidade) {
    fetch('http://localhost:5000/editar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Codigo: codigo, Quantidade: quantidade}),
    })
}

function makeEditable () {
    $("td").dblclick(function () {
        var conteudoOriginal = $(this).text();
        var itemID = $(this).attr("id");
        if (itemID === undefined) {
            return;
        }
        console.log("E ai??? " + itemID);
        
        $(this).addClass("celulaEmEdicao");
        $(this).html("<input type='text' value='" + conteudoOriginal + "' />");
        $(this).children().first().focus();

        $(this).children().first().keypress(function (e) {
            if (e.which == 13) {
                var novoConteudo = $(this).val();
                $(this).parent().text(novoConteudo);
                $(this).parent().removeClass("celulaEmEdicao");
                console.log("Codigo " + itemID + " Editado para " + novoConteudo);
                sendNewValue(itemID, novoConteudo);
            }
        });

	$(this).children().first().blur(function(){
		$(this).parent().text(conteudoOriginal);
		$(this).parent().removeClass("celulaEmEdicao");
	});
    });
};