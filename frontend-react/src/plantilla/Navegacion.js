
import { useNavigate } from 'react-router-dom'


export default function Navegacion({ logueado, setLogueado }) {
  const navigate = useNavigate();


  return (
    <header>
      <div className="contenedor">
        <h2 className="logotipo">Bilbioteca Juegos</h2>
        <nav>
          <a href="#" className="activo">Inicio</a>
          <a href="#">Programas</a>
          <a href="#">Películas</a>
          <a href="#">Más Recientes</a>
          <a href="#">Mi lista</a>
        </nav>
      </div>
    </header>

  )
}
