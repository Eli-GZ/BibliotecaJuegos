import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function ListadoJuegos() {
  const urlBase = "http://localhost:8080/juegos";

  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar juegos");
    console.log(resultado.data);
    setJuegos(resultado.data);
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
      {juegos?.map((juegos, indice) => (
        <div className="card" key={indice}>
          <img src={juegos.imagen} alt="" className="card-image" />
          <div className="card-content">
            <h2 className="card-title">{juegos.nombre}</h2>
            <p>{juegos.unaPlataforma.version}</p>

            <button></button><button></button>
          </div>
        </div>
      ))}
    </main>

  )
}
