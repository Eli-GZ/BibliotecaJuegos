import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function ListadoJuegos({imageUrl, title, imdbLink, year}) {
  const urlBase = "http://localhost:8080/juegos/todos";

  const [juegos, setVentas] = useState([]);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar juegos");
    console.log(resultado.data);
    setVentas(resultado.data);
  }



  // const eliminarVenta = async (id) => {
  //   const confirmacion = window.confirm("¿Estás seguro de eliminar esta venta?");
  //   if (confirmacion) {
  //     await axios.delete(`${urlBase}/${id}`);
  //     cargarVentas();
  //     alert("La venta se eliminó correctamente");
  //   }
  // }

  
  return (
    <main>
      <div className="card">
        <img src="https://juegosdigitalesargentina.com/files/images/productos/1494699100-doom-ps4-cover-640x798.jpg" alt="" className="card-image"/>
        <div className="card-content">
            <h2 className="card-title">{title} ({year})</h2>
             <a href={imdbLink} target="">View on IMDB</a>   
             <button></button><button></button>
        </div>
        
    </div>

    
    </main>



    // <div className="container contenido-principal">
    //   <div className="container text-center" style={{ marginBottom: "30px"  }}>
    //     <h4 className="text-dark fs-3">Todas las ventas</h4>
    //   </div>

    //   {/* Scroll vertical con encabezado sticky */}
    //   <div className="table-responsive" style={{ maxHeight: "78vh", overflowY: "auto"}}>
    //     <table className="table table-striped table-hover align-middle" style={{ minWidth: "1000px" }}>
    //       <thead className="table-dark fs-5" style={{ position: "sticky", top: "0", zIndex: "10" }}>
    //         <tr>
    //           <th scope="col">Código de venta</th>
    //           <th scope="col">Cliente</th>
    //           <th scope="col">Fecha</th>
    //           <th scope="col">Lista de productos</th>
    //           <th scope="col">Total</th>
    //           <th scope="col"></th>
    //           <th scope="col"></th>
    //         </tr>
    //       </thead>
    //       <tbody className="fs-5 fw-bolder">
    //         {ventas.map((ventas, indice) => (
    //           <tr key={indice}>
    //             <th scope="row">{ventas.username}</th>
    //             <td>{ventas.unCliente.nombre} {ventas.unCliente.apellido}</td>
    //             <td>{(ventas.fechaVenta)}</td>
    //             <td>
    //               <div className="dropdown">
    //                 <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                   Ver productos
    //                 </button>
    //                 <ul className="dropdown-menu">
    //                   {ventas.listaProductos.map((producto, i) => (
    //                     <li key={i} className="dropdown-item">
    //                       {producto.nombre} - ${producto.costo}
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </div>
    //             </td>
    //             <td>
    //               <NumericFormat
    //                 value={ventas.total}
    //                 displayType="text"
    //                 thousandSeparator="."
    //                 decimalSeparator=","
    //                 prefix="$"
    //               />
    //             </td>
    //             <td></td>
    //             <td className="text-center">
    //               <Link to={`/editar/venta/${ventas.codigo_venta}`} className="btn btn-light btn-sm me-3 fs-5 border-dark">
    //                <img src={edit}alt=''></img>
    //               </Link>
    //               {/* <button
    //                 onClick={() => eliminarVenta(ventas.codigo_venta)}
    //                 className="btn btn-light btn-sm fs-5 border-dark">
    //                 <img src={borrar}alt=''></img>
    //               </button> */}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  )
}
