package com.AppVenta.service;

import com.AppJuegos.model.Cliente;
import com.AppJuegos.model.Producto;
import com.AppJuegos.model.Juego;
import com.AppJuegos.repository.IVentaRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VentaService implements IVentaService {

    @Autowired
    private IVentaRepository VentRepo;

    @Override
    public List<Juego> getVentas() {
        List<Juego> listaVentas = VentRepo.findAll();
        return listaVentas;
    }

    @Override
    public void saveVenta(Juego vent) {
        VentRepo.save(vent);
    }

    @Override
    public void deleteVenta(Long codigo_venta) {
        VentRepo.deleteById(codigo_venta);
    }

    @Override
    public Juego findVenta(Long codigo_venta) {
        Juego vent = VentRepo.findById(codigo_venta).orElse(null);
        return vent;
    }

    @Override
    public void editVenta(Long codigo_venta, LocalDate nuevaFecha_venta, Double nuevoTotal, List<Producto> nuevaListaProductos, Cliente nuevoUnCliente) {

        Juego vent = this.findVenta(codigo_venta);
        vent.setFechaVenta(nuevaFecha_venta);
        vent.setTotal(nuevoTotal);
        vent.setListaProductos(nuevaListaProductos);
        vent.setUnCliente(nuevoUnCliente);

        this.saveVenta(vent);

    }

    @Override
    public void editVenta(Juego vent) {
        this.saveVenta(vent);
    }

    @Override
    public List<Juego> getVentasPorFecha(LocalDate fecha) {
        return VentRepo.findByFechaVenta(fecha);
    }

    @Override
    public List<Juego> getVentasConProducto(Long codigoProducto) {
        return VentRepo.findByProductoCodigo(codigoProducto);
    }
   
}
