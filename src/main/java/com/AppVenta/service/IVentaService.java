package com.AppVenta.service;

import com.AppJuegos.model.Cliente;
import com.AppJuegos.model.Producto;
import com.AppJuegos.model.Juego;
import java.time.LocalDate;
import java.util.List;

public interface IVentaService {
    
    //Traer todas las ventas
    public List<Juego> getVentas();

    //Guardar una venta 
    public void saveVenta(Juego vent);

    //Borrar una venta
    public void deleteVenta(Long codigo_venta);

    //Encontrar una venta
    public Juego findVenta(Long codigo_venta);

    //Editar una venta
    public void editVenta(Long codigo_venta, LocalDate nuevaFecha_venta, Double nuevoTotal, List<Producto> nuevaListaProductos, Cliente nuevoUnCliente);

    public void editVenta(Juego vent);
    
    //Traer venta por fecha
    public List<Juego> getVentasPorFecha(LocalDate fecha);
    
    //Traer venta por fecha
    public List<Juego> getVentasConProducto(Long codigoProducto);

}
