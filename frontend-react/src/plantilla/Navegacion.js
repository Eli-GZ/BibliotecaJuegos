import { NavLink } from "react-router-dom";

export default function Navegacion() {
  return (
   <header>
  <div className="contenedor">
    <h2 className="logotipo">Mega Biblioteca</h2>
    <nav>
      <NavLink to="/" className={({ isActive }) => isActive ? "activo" : ""}>
        Todos los juegos
      </NavLink>
      <NavLink to="/pc" className={({ isActive }) => isActive ? "activo" : ""}>
        PC
      </NavLink>
      <NavLink to="/xbox" className={({ isActive }) => isActive ? "activo" : ""}>
        XBOX live
      </NavLink>
      <NavLink to="/psn" className={({ isActive }) => isActive ? "activo" : ""}>
        PSNetwork
      </NavLink>
      <NavLink to="/agregar/juego" className={({ isActive }) => isActive ? "activo" : ""}>
        Agregar juego
      </NavLink>
    </nav>
  </div>
</header>

  )
}
