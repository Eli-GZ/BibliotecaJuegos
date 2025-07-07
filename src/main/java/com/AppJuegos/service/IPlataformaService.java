
package com.AppJuegos.service;

import com.AppJuegos.model.Plataforma;
import java.util.List;


public interface IPlataformaService {
    
    //Traer todas las plataformas
    public List<Plataforma> getPlataformas();

    //Guardar una Plataforma
    public void savePlataforma(Plataforma plat);

    //Borrar una Plataforma
    public void deletePlataforma(Long idPlat);

    //Encontrar una Plataforma
    public Plataforma findPlataforma(Long idPlat);

    //Editar una Plataforma
    public void editPlataforma(Long idPlat, String nombrePlataforma, String version);

}
