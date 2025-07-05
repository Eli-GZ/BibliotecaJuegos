package com.AppJuegos.service;

import com.AppJuegos.model.Juego;
import com.AppJuegos.model.Plataforma;
import java.util.List;

public interface IJuegoService {

    //Traer todos los juegos
    public List<Juego> getJuegos();

    //Guardar una juego
    public void saveJuego(Juego juego);

    //Borrar un juego
    public void deleteJuego(Long id_juego);

    //Encontrar un juego
    public Juego findJuego(Long id_juego);

    //Editar un juego
    public void editJuego(Long id_juego, String nombre, String imagen, Plataforma unPlataforma);


}
