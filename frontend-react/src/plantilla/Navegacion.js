
import { useNavigate } from 'react-router-dom'


export default function Navegacion({ logueado, setLogueado }) {
  const navigate = useNavigate();


  return (
    <header>
      <div className="contenedor">
        <h2 className="logotipo">Biblioteca Juegos</h2>
        <nav>
          <a href="#" className="activo">Todos los juegos</a>
          <a href="#">PSNetwork</a>
          <a href="#">XBOX live</a>
          <a href="#">PC</a>
          <a href="#">Agregar juego</a>
        </nav>
      </div>
    </header>

  )
}
