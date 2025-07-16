
import edit from "../assets/edit-icon.png"
import borrar from "../assets/borrar-icon.png"
import { Link } from 'react-router-dom';
import { useState } from "react";

export default function ListadoPSN({ juegos, onEliminar }) {
  const [versionSeleccionada, setVersionSeleccionada] = useState("");


  const juegosPSN = juegos.filter(
    j => j.unaPlataforma?.nombrePlataforma === "PlayStation"
  );
  const juegosFiltrados = juegosPSN
    .filter(j =>
      versionSeleccionada === "" || j.unaPlataforma?.version === versionSeleccionada
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre));


  return (
    <main style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <div className="dropbar">
        <p style={{ color: "white" }}>Todos los Juegos: {juegosFiltrados.length}</p>
        <select
          className="form-select"
          value={versionSeleccionada}
          onChange={(e) => setVersionSeleccionada(e.target.value)}
        >
          <option value="">Todas las Versiones</option>
          {[...new Set(juegosPSN.map(j => j.unaPlataforma?.version))] 
            .filter(Boolean)
            .map(version => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
        </select>
      </div>
      {juegosFiltrados.map((juego, indice) => (
        juego && (
          <div className="card" key={indice}>
            <img src={juego.imagen} alt="" className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{juego.nombre}</h2>
              <p>{juego.unaPlataforma?.version || "Sin plataforma"}</p>
            </div>
            <div className="card-buttons">
              <Link to={`/editar/psn/${juego.id_juego}`} className="btn2">
                <img src={edit} alt="editar" />
              </Link>
              <button
                onClick={() => onEliminar(juego.id_juego)}
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
