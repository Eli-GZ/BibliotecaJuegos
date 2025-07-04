package com.AppJuegos.service;

import com.AppJuegos.model.Juego;
import com.AppJuegos.model.Plataforma;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.AppJuegos.repository.IJuegoRepository;
import com.AppJuegos.service.IJuegoService;

@Service
public class JuegoService implements IJuegoService {

    @Autowired
    private IJuegoRepository juegoRepo;

    @Override
    public List<Juego> getJuegos() {
        List<Juego> listaJuegos = juegoRepo.findAll();
        return listaJuegos;
    }

    @Override
    public void saveJuego(Juego juego) {
        juegoRepo.save(juego);
    }

    @Override
    public void deleteJuego(Long id_juego) {
        juegoRepo.deleteById(id_juego);
    }

    @Override
    public Juego findJuego(Long id_juego) {
        return juegoRepo.findById(id_juego).orElse(null);
    }

    @Override
    public void editJuego(Long id_juego, String nombre, String imagen, Plataforma unPlataforma) {

        Juego jueg = this.findJuego(id_juego);
        jueg.setImagen(imagen);
        jueg.setNombre(nombre);
        jueg.setUnPlataforma(unPlataforma);

        this.saveJuego(jueg);
    }

}
