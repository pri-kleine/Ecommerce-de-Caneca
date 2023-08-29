

        function cadastrarItem() {
            var codigo = document.getElementById("codigo").value;
            var nomedoProduto = document.getElementById("nomeProduto").value;
            var descricao = document.getElementById("descricao").value;
            var quantidade = document.getElementById("quantidade").value;
            var precoUnitario = document.getElementById("precoUnitario").value;
            console.log(codigo);
            console.log(nomedoProduto);
            console.log(descricao);
            console.log(quantidade);
            console.log(precoUnitario);
            
            var itemData = {Codigo: codigo, NomedoProduto: nomedoProduto, Descricao: descricao, Quantidade: quantidade, PrecoUnitario: precoUnitario};
            
            console.log(itemData);

            fetch('URL_DO_SEU_BACKEND', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            })
            .then(response => {
                if (response.ok) {
                    console.log('Item cadastrado com sucesso!');
                } else {
                    console.error('Erro ao cadastrar o item.');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
        }

