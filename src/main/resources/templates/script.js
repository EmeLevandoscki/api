// Início - Funções principais (Carregar e Exibir Produtos)

function fetchProducts() {
    fetch('http://localhost:8080/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    .then(response => {
        const contentType = response.headers.get('Content-Type');
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos. Código: ' + response.status);
        }
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        throw new Error('Tipo de resposta inválido.');
    })
    .then(data => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        if (data.length === 0) {
            alert('Nenhum produto encontrado.');
        } else {
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
                productList.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao carregar produtos. Tente novamente mais tarde.');
    });
}

// Fim - Funções de CRUD (Adicionar, Editar, Excluir, Atualizar)

function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById('nome').value;
    const productDescription = document.getElementById('descricao').value;
    const productPrice = document.getElementById('preco').value;

    const newProduct = {
        nome: productName,
        descricao: productDescription,
        preco: parseFloat(productPrice),
    };

    fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
        mode: 'cors',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar produto.');
        } 
        alert('Produto cadastrado com sucesso!');
        fetchProducts();
    })
    .catch(error => {
        console.error('Erro ao cadastrar produto:', error);
        alert('Erro ao cadastrar produto.');
    });
}

function editProduct(productId) {
    console.log(`Editando produto com ID: ${productId}`);
    
    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do produto.');
        }
        return response.json();
    })
    .then(product => {
        document.getElementById('edit-id').value = product.id;
        document.getElementById('edit-nome').value = product.nome;
        document.getElementById('edit-preco').value = product.preco;
        document.getElementById('edit-descricao').value = product.descricao;
    })
    .catch(error => {
        console.error('Erro ao carregar produto para edição:', error);
        alert('Erro ao carregar os dados do produto.');
    });
}

function deleteProduct(productId) {
    console.log(`Excluindo produto com ID: ${productId}`);
    
    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir produto.');
        } 
        fetchProducts();
    })
    .catch(error => {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir o produto.');
    });
}

function updateProduct(event) {
    event.preventDefault();
    const productId = document.getElementById('edit-id').value;
    const productName = document.getElementById('edit-nome').value;
    const productDescription = document.getElementById('edit-descricao').value;
    const productPrice = document.getElementById('edit-preco').value;

    const updatedProduct = {
        nome: productName,
        descricao: productDescription,
        preco: parseFloat(productPrice),
    };

    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
        mode: 'cors',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar produto.');
        } 
        alert('Produto atualizado com sucesso!');
        fetchProducts();
    })
    .catch(error => {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto.');
    });
}
