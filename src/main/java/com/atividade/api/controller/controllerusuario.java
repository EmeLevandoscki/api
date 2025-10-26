package com.atividade.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController; 

import com.atividade.api.model.usuario;

import com.atividade.api.DAO.IUsuario; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*import org.springframework.web.bind.annotation.PathVariable;>*/




@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class controllerusuario {

    @Autowired IUsuario dao;
    
    @GetMapping 
    public   List<usuario> ListaUsuarios (){
        return (List<usuario>) dao.findAll();
    }

    @PostMapping
    public usuario criarUsuario (@RequestBody usuario usuariO){
        usuario usuarioNovo = dao.save(usuariO);
        return usuarioNovo;
    }

    @PutMapping
    public usuario editUsuario (@RequestBody usuario usuario){
        usuario usuarioNovo = dao.save(usuario);
        return usuarioNovo;
    }

    @DeleteMapping("/{id}")
    public usuario excluirUsuario(@PathVariable int id) {
    usuario Usuario = dao.findById(id).get(); 
    dao.deleteById(id);
    return Usuario;
}

    
}
 