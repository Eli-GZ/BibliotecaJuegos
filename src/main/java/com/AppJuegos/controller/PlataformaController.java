package com.AppJuegos.controller;

import com.AppJuegos.model.Plataforma;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.AppJuegos.service.IPlataformaService;

@RestController
@CrossOrigin(value = "http://localhost:3000")
public class PlataformaController {

    @Autowired
    private IPlataformaService platServ;

//ENDPOINT para obtener todos los juegos
    @GetMapping("/plataformas")
    public List<Plataforma> traerJuegos() {
        return platServ.getPlataformas();
    }

}
