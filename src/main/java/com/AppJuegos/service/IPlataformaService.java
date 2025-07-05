
package com.AppJuegos.service;

import com.AppJuegos.model.Plataforma;
import java.util.List;


public interface IPlataformaService {
    
    //Traer todas las ventas
    public List<Plataforma> getPlataformas();

    //Guardar una venta 
    public void savePlataforma(Plataforma plat);

    //Borrar una venta
    public void deletePlataforma(Long idPlat);

    //Encontrar una venta
    public Plataforma findPlataforma(Long idPlat);

    //Editar una venta
    public void editPlataforma(Long idPlat, String nombrePlataforma, String consola);

}
