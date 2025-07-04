package com.AppJuegos.controller;

import com.AppJuegos.dto.ProductoCantidadDTO;
import com.AppJuegos.dto.TotalVentaDTO;
import com.AppJuegos.dto.VentaDTO;
import com.AppJuegos.model.Cliente;
import com.AppJuegos.model.Producto;
import com.AppJuegos.model.Juego;
import com.AppVenta.service.IClienteService;
import com.AppVenta.service.IProductoService;
import com.AppVenta.service.IVentaService;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
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

@RestController
@RequestMapping("juegos")
@CrossOrigin(value = "http://localhost:3000")
public class VentaController {
    
    @Autowired
    private IVentaService ventaServ;

//ENDPOINT para crear una nueva venta
 @PostMapping("/ventas")
public ResponseEntity<?> createVenta(@RequestBody VentaDTO ventaDTO) {   

    return ResponseEntity.ok(null);
}

//ENDPOINT para obtener todas las ventas

@GetMapping("/ventas")
    public List<Juego> getVentas() {
        return ventaServ.getVentas();
    }

//ENDPOINT para obtener una venta
    @GetMapping("/ventas/{codigo_venta}")
    public ResponseEntity<?> getVenta(@PathVariable Long codigo_venta) {
        Juego ventaExistente = ventaServ.findVenta(codigo_venta);
        if (ventaExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venta no encontrada");
        }

        Map<Long, ProductoCantidadDTO> mapaProductos = new HashMap<>();

        for (Producto p : ventaExistente.getListaProductos()) {
            ProductoCantidadDTO dto = mapaProductos.get(p.getCodigo_producto());
            if (dto == null) {
                dto = new ProductoCantidadDTO();
                dto.setCodigo_producto(p.getCodigo_producto());
                dto.setCantidad(1);
                mapaProductos.put(p.getCodigo_producto(), dto);
            } else {
                dto.setCantidad(dto.getCantidad() + 1);
            }
        }

        VentaDTO respuesta = new VentaDTO();
        respuesta.setCodigo_venta(ventaExistente.getCodigo_venta());
        respuesta.setFecha_venta(ventaExistente.getFechaVenta()); // LocalDate aquí
        respuesta.setTotal(ventaExistente.getTotal());
        respuesta.setUnCliente(ventaExistente.getUnCliente());
        respuesta.setListaProductos(new ArrayList<>(mapaProductos.values()));

        return ResponseEntity.ok(respuesta);
    }

//ENDPOINT para eliminar una venta
    @DeleteMapping("/ventas/{codigo_venta}")
    public String deleteVenta(@PathVariable Long codigo_venta) {
        //confirmar que existe un cliente        
        Juego vent = ventaServ.findVenta(codigo_venta);

        if (vent != null) {
            ventaServ.deleteVenta(codigo_venta);
            //mensaje de eliminacion correcta
            return "La venta fue eliminada correctamente";
        } else {
            return "No se encontro el codigo de venta";
        }
    }
//ENDPOINT para editar una venta

    @PutMapping("/ventas/{codigo_venta}")
    public String editVenta(@PathVariable Long codigo_venta, @RequestBody VentaDTO ventaDTO) {

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
