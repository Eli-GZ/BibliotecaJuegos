import axios from 'axios';
import React, { useEffect, useState } from 'react'
import edit from "../assets/edit-icon.png"
import borrar from "../assets/borrar-icon.png"
import { Link } from 'react-router-dom';

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


  const eliminarJuego = async (id_juego) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este juego?");
    if (confirmacion) {
      await axios.delete(`${urlBase}/${id_juego}`);
      cargarJuegos();
      alert("La venta se eliminó correctamente");
    }
  }


  return (
    <main style={{ display: "flex" }}>
      {juegos?.map((juegos, indice) => (
        <div className="card" key={indice}>
          <img src={juegos.imagen} alt="" className="card-image" />
          <div className="card-content">
            <h2 className="card-title">{juegos.nombre}</h2>
            <p>{juegos.unaPlataforma?.version || "Sin plataforma"}</p>

            <Link to={`/editar/juego/${juegos.id_juego}`} className="btn2">
              <img src={edit} alt=''></img>
            </Link>
            <button
              onClick={() => eliminarJuego(juegos.id_juego)}
              className="btn1">
              <img src={borrar} alt=''></img>
            </button>
          </div>
        </div>
      ))
      }
    </main >

  )
}
