package com.AppJuegos.controller;

import com.AppJuegos.model.Juego;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.AppJuegos.service.IJuegoService;

@RestController
@CrossOrigin(value = "http://localhost:3000")
public class JuegoController {

    @Autowired
    private IJuegoService juegoServ;

//ENDPOINT para obtener todos los juegos
    @GetMapping("/juegos")
    public List<Juego> traerJuegos() {
        return juegoServ.getJuegos();
    }

//ENDPOINT para obtener un juego
    @GetMapping("/juegos/{id_juego}")
    public Juego traerJuego(@PathVariable Long id_juego) {
        return juegoServ.findJuego(id_juego);
    }

//ENDPOINT para crear un nuevo juego
    @PostMapping("/juegos")
    public String createJuego(@RequestBody Juego juego) {
        Juego jueg = juego;

        if (jueg != null) {
            juegoServ.saveJuego(juego);
            return "La venta fue creada correctamente";

        } else {
            return "Ocurrio un error";
        }
    }

//ENDPOINT para eliminar una venta
    @DeleteMapping("/juegos/{id_juego}")
    public String deleteJuego(@PathVariable Long id_juego) {
        //confirmar que existe un cliente        
        Juego jueg = juegoServ.findJuego(id_juego);

        if (jueg != null) {
            juegoServ.deleteJuego(id_juego);
            //mensaje de eliminacion correcta
            return "El juego fue eliminada correctamente";
        } else {
            return "No se encontro el id del juego";
        }
    }

//ENDPOINT para editar un Juego 
    @PutMapping("/juegos/{id_juego}")
    public ResponseEntity<Juego> actualizarJuego(@PathVariable Long id_juego, @RequestBody Juego juegoRecibido) {

        Juego juego = juegoServ.findJuego(id_juego);

        juego.setNombre(juegoRecibido.getNombre());
        juego.setImagen(juegoRecibido.getImagen());
        juego.setUnaPlataforma(juegoRecibido.getUnaPlataforma());

        juegoServ.saveJuego(juego);

        return ResponseEntity.ok(juego);
    }

}
