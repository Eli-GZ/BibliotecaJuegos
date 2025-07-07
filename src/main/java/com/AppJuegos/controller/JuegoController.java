package com.AppJuegos.controller;

import com.AppJuegos.model.Juego;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("juegos")
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


//ENDPOINT para editar una venta

    @PutMapping("/juegos/{id_juego}")
    public String editVenta(@PathVariable Long id_juego, @RequestBody VentaDTO ventaDTO) {

        // Buscar la venta original
        Juego ventaExistente = ventaServ.findVenta(codigo_venta);
        if (ventaExistente == null) {
            return "** Error: Venta no encontrada **";
        }

        //Obtener todos los productos   
        List<Producto> totalProductos = produServ.getProductos();

        //Obtener mapa id y producto
        Map<Long, Producto> mapaProducto = totalProductos.stream()
                .collect(Collectors.toMap(Producto::getCodigo_producto, p -> p));

        //Construir la lista de productos respetando repeticiones
        List<Producto> productosSeleccionados = new ArrayList<>();
        double ventasTotales = 0.0;

        for (ProductoCantidadDTO entrada : ventaDTO.getListaProductos()) {
            Long idProducto = entrada.getCodigo_producto();
            int cantidad = entrada.getCantidad();

            Producto produ = mapaProducto.get(idProducto);
            if (produ != null) {
                for (int i = 0; i < cantidad; i++) {
                    productosSeleccionados.add(produ);
                    ventasTotales += produ.getCosto() != null ? produ.getCosto() : 0.0;
                }
            }
        }

        // Buscar el cliente
        List<Cliente> todosLosClientes = clientServ.getClientes();
        Cliente cliente = todosLosClientes.stream()
                .filter(c -> c.getId_cliente().equals(ventaDTO.getId_cliente()))
                .findFirst()
                .orElse(null);

        if (cliente == null || productosSeleccionados.isEmpty()) {
            return " Error: Cliente o productos no encontrados";
        }

        // Actualizar los datos de la venta
        ventaExistente.setFechaVenta(ventaDTO.getFecha_venta());
        ventaExistente.setTotal(ventasTotales);
        ventaExistente.setListaProductos(productosSeleccionados);
        ventaExistente.setUnCliente(cliente);

        // Guardar los cambios
        ventaServ.saveVenta(ventaExistente);

        return "La venta fue editada correctamente";
    }

}
