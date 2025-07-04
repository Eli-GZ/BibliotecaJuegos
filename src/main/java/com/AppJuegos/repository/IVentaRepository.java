package com.AppJuegos.repository;

import com.AppJuegos.model.Juego;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IVentaRepository extends JpaRepository<Juego, Long> {

    List<Juego> findByFechaVenta(LocalDate fecha_venta);

    @Query("SELECT v FROM Venta v JOIN v.listaProductos p WHERE p.codigo_producto = :codigo")
    List<Juego> findByProductoCodigo(@Param("codigo") Long codigoProducto);
}
