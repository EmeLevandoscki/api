const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:3000',  // URL do seu frontend, pode ser modificada conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type'],  // Cabeçalhos permitidos
};

app.use(cors(corsOptions));  // Aplica o CORS globalmente para todas as rotas

// Usar JSON no corpo da requisição
app.use(express.json());

const products = [
    { id: 1, nome: 'Produto 1', descricao: 'Descrição do Produto 1', preco: 100.00 },
    { id: 2, nome: 'Produto 2', descricao: 'Descrição do Produto 2', preco: 200.00 },
    { id: 3, nome: 'Produto 3', descricao: 'Descrição do Produto 3', preco: 300.00 }
];

// Endpoint para obter todos os produtos
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Endpoint para obter um produto específico
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

// Endpoint para excluir um produto
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

// Endpoint para adicionar um novo produto
app.post('/api/products', (req, res) => {
    const { nome, descricao, preco } = req.body;
    if (!nome || !descricao || !preco) {
        return res.status(400).json({ error: 'Nome, descrição e preço são obrigatórios' });
    }
    const newProduct = {
        id: products.length + 1,
        nome,
        descricao,
        preco
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoints relacionados a usuários (exemplo)
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    res.status(201).json({ message: 'Usuário criado com sucesso' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
