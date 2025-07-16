import edit from "../assets/edit-icon.png";
import borrar from "../assets/borrar-icon.png";
import { Link } from "react-router-dom";

export default function ListadoJuegos({ juegos, onEliminar }) {
  
  return (
    <main style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <div className="dropbar">
        <p style={{ color: "white" }}>Todos los Juegos: {juegos.length}</p>
      </div>

      {[...juegos]
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .map((juego, indice) => (
          <div className="card" key={indice}>
            <img src={juego.imagen} alt={juego.nombre} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{juego.nombre}</h2>
              <p>{juego.unaPlataforma?.version || "Sin plataforma"}</p>
            </div>
            <div className="card-buttons">
              <Link to={`/editar/juego/${juego.id_juego}`} className="btn2">
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
        ))}
    </main>
  );
}