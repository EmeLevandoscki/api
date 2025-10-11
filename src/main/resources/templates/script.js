 // Função para buscar produtos da API e exibir na tabela
function fetchProducts() {
    fetch('http://localhost:8080/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    })
    .then(response => {
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        return response.json(); // Retornar a resposta como JSON
    })
    .then(data => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';  // Limpar a tabela antes de adicionar os novos produtos

        // Verifica se a resposta contém produtos
        if (data.length === 0) {
            alert('Nenhum produto encontrado.');
        } else {
            // Para cada produto na resposta, cria uma linha da tabela
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.nome}</td>
                    <td>${product.descricao}</td>
                    <td>R$ ${product.preco}</td>
                    <td>
                        <button onclick="editProduct(${product.id})">Editar</button>
                        <button onclick="deleteProduct(${product.id})">Excluir</button>
                    </td>
                `;
                productList.appendChild(row); // Adicionar a linha à tabela
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao buscar produtos. Verifique se o servidor está em execução.');
    });
}

// Função para editar produto
function editProduct(productId) {
    // Implementar lógica de edição aqui
    console.log(`Editando produto com ID: ${productId}`);
}

// Função para excluir produto
function deleteProduct(productId) {
    // Implementar lógica de exclusão aqui
    console.log(`Excluindo produto com ID: ${productId}`);
}
