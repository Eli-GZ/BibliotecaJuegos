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
    public List<Juego> getJuegos() {
        return juegoServ.getJuegos();
    }

    @GetMapping("/juegos/{id_juego}")
    public Juego getJuego(@PathVariable Long id_juego) {       
        return juegoServ.findJuego(id_juego);
    }

////ENDPOINT para crear una nueva venta
//    @PostMapping("/todos")
//    public ResponseEntity<?> createJuego(@RequestBody Juego juego) {
//
//        return ResponseEntity.ok(juego);
//    }
//

//
////ENDPOINT para obtener una venta
   
//
////ENDPOINT para eliminar una venta
//    @DeleteMapping("/ventas/{codigo_venta}")
//    public String deleteVenta(@PathVariable Long codigo_venta) {
//        //confirmar que existe un cliente        
//        Juego vent = ventaServ.findVenta(codigo_venta);
//
//        if (vent != null) {
//            ventaServ.deleteVenta(codigo_venta);
//            //mensaje de eliminacion correcta
//            return "La venta fue eliminada correctamente";
//        } else {
//            return "No se encontro el codigo de venta";
//        }
//    }
////ENDPOINT para editar una venta
//
//    @PutMapping("/ventas/{codigo_venta}")
//    public String editVenta(@PathVariable Long codigo_venta, @RequestBody VentaDTO ventaDTO) {
//
//        // Buscar la venta original
//        Juego ventaExistente = ventaServ.findVenta(codigo_venta);
//        if (ventaExistente == null) {
//            return "** Error: Venta no encontrada **";
//        }
//
//        //Obtener todos los productos   
//        List<Producto> totalProductos = produServ.getProductos();
//
//        //Obtener mapa id y producto
//        Map<Long, Producto> mapaProducto = totalProductos.stream()
//                .collect(Collectors.toMap(Producto::getCodigo_producto, p -> p));
//
//        //Construir la lista de productos respetando repeticiones
//        List<Producto> productosSeleccionados = new ArrayList<>();
//        double ventasTotales = 0.0;
//
//        for (ProductoCantidadDTO entrada : ventaDTO.getListaProductos()) {
//            Long idProducto = entrada.getCodigo_producto();
//            int cantidad = entrada.getCantidad();
//
//            Producto produ = mapaProducto.get(idProducto);
//            if (produ != null) {
//                for (int i = 0; i < cantidad; i++) {
//                    productosSeleccionados.add(produ);
//                    ventasTotales += produ.getCosto() != null ? produ.getCosto() : 0.0;
//                }
//            }
//        }
//
//        // Buscar el cliente
//        List<Cliente> todosLosClientes = clientServ.getClientes();
//        Cliente cliente = todosLosClientes.stream()
//                .filter(c -> c.getId_cliente().equals(ventaDTO.getId_cliente()))
//                .findFirst()
//                .orElse(null);
//
//        if (cliente == null || productosSeleccionados.isEmpty()) {
//            return " Error: Cliente o productos no encontrados";
//        }
//
//        // Actualizar los datos de la venta
//        ventaExistente.setFechaVenta(ventaDTO.getFecha_venta());
//        ventaExistente.setTotal(ventasTotales);
//        ventaExistente.setListaProductos(productosSeleccionados);
//        ventaExistente.setUnCliente(cliente);
//
//        // Guardar los cambios
//        ventaServ.saveVenta(ventaExistente);
//
//        return "La venta fue editada correctamente";
//    }

}
