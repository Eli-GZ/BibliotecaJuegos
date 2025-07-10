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
      {[...juegos]
      // .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map((juego, indice) => (
        juego && (
          <div className="card" key={indice}>
            <img src={juego.imagen} alt="" className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{juego.nombre}</h2>
              <p>{juego.unaPlataforma?.version || "Sin plataforma"}</p>
            </div>
            <div className="card-buttons">
              <Link to={`/editar/juego/${juego.id_juego}`} className="btn2">
                <img src={edit} alt="editar" />
              </Link>
              <button
                onClick={() => eliminarJuego(juego.id_juego)}
                className="btn1"
              >
                <img src={borrar} alt="borrar" />
              </button>
            </div>
          </div>

        )
      ))}
    </main >

  )
}
