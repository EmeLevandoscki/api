const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());


const products = [
    { id: 1, nome: 'Produto 1', descricao: 'Descrição do Produto 1', preco: 100.00 },
    { id: 2, nome: 'Produto 2', descricao: 'Descrição do Produto 2', preco: 200.00 },
    { id: 3, nome: 'Produto 3', descricao: 'Descrição do Produto 3', preco: 300.00 }
];

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
