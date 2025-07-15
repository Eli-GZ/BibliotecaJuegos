import edit from "../assets/edit-icon.png"
import borrar from "../assets/borrar-icon.png"
import { Link } from 'react-router-dom';

export default function ListadoXBOX({ juegos, onEliminar }) {


  const juegosFiltrados = [...juegos]
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .filter(j => j.unaPlataforma?.nombrePlataforma === "XBOX");



  return (
    <main style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingRight: "20px", marginBottom: "10px" }}>
        <p style={{ color: "white" }}>Todos los Juegos: {juegosFiltrados.length}</p>
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
              <Link to={`/editar/xbox/${juego.id_juego}`} className="btn2">
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
