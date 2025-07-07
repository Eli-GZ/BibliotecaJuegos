package com.AppJuegos.service;

import com.AppJuegos.model.Plataforma;
import com.AppJuegos.repository.IPlataformaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlataformaService implements IPlataformaService {

    @Autowired
    private IPlataformaRepository platRepo;

    @Override
    public List<Plataforma> getPlataformas() {
        List<Plataforma> listaPlataformas = platRepo.findAll();
        return listaPlataformas;
    }

    @Override
    public void savePlataforma(Plataforma plat) {
        platRepo.save(plat);
    }

    @Override
    public void deletePlataforma(Long idPlat) {
        platRepo.deleteById(idPlat);
    }

    @Override
    public Plataforma findPlataforma(Long idPlat) {
        return platRepo.findById(idPlat).orElse(null);
    }

    @Override
    public void editPlataforma(Long idPlat, String nombrePlataforma, String version) {
        Plataforma plat = this.findPlataforma(idPlat);
        plat.setNombrePlataforma(nombrePlataforma);
        plat.setVersion(version);

        this.savePlataforma(plat);
    }

}
