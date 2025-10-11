package com.atividade.api.controller;

import com.atividade.api.model.Produto;
import com.atividade.api.repositorio.PRDTrepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class PRDTcontroller {

    @Autowired
    private PRDTrepositorio productRepository;

    // Endpoint de Teste
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("API está funcionando!");
    }

    // Endpoint para Adicionar Produto
    @PostMapping
    public ResponseEntity<Produto> createProduct(@RequestBody Produto product) {
        Produto savedProduct = productRepository.save(product);
        return ResponseEntity.created(URI.create("/api/products/" + savedProduct.getId())).body(savedProduct);
    }

    // Endpoint para Listar Todos os Produtos
    @GetMapping
    public List<Produto> getAllProducts() {
        return productRepository.findAll();
    }

    // Endpoint para Buscar Produto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProductById(@PathVariable Long id) {
        Optional<Produto> produto = productRepository.findById(id);
        return produto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para Atualizar um Produto
    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduct(@PathVariable Long id, @RequestBody Produto updatedProduct) {
        Optional<Produto> produtoOptional = productRepository.findById(id);
        if (produtoOptional.isPresent()) {
            Produto produto = produtoOptional.get();
            produto.setNome(updatedProduct.getNome());
            produto.setDescricao(updatedProduct.getDescricao());
            produto.setPreco(updatedProduct.getPreco());

            Produto savedProduct = productRepository.save(produto);
            return ResponseEntity.ok(savedProduct); // Retorna o produto atualizado
        } else {
            return ResponseEntity.notFound().build(); // Produto não encontrado, retorna 404
        }
    }

    // Endpoint para Deletar um Produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Optional<Produto> produto = productRepository.findById(id);
        if (produto.isPresent()) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();  // Produto removido com sucesso
        } else {
            return ResponseEntity.notFound().build();  // Produto não encontrado, retorna 404
        }
    } 

}
