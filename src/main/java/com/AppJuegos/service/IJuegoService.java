package com.AppJuegos.service;

import com.AppJuegos.model.Juego;
import com.AppJuegos.model.Plataforma;
import java.util.List;

public interface IJuegoService {

    //Traer todas las ventas
    public List<Juego> getJuegos();

    //Guardar una venta 
    public void saveJuego(Juego juego);

    //Borrar una venta
    public void deleteJuego(Long id_juego);

    //Encontrar una venta
    public Juego findJuego(Long id_juego);

    //Editar una venta
    public void editJuego(Long id_juego, String nombre, String imagen, Plataforma unPlataforma);


}
