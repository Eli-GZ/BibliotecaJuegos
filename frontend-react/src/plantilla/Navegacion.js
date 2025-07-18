import { NavLink } from "react-router-dom";


export default function Navegacion({ filtro, setFiltro }) {
  const handleBuscar = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <header>
      <div className="contenedor">
        <h2 className="logotipo">Mi Biblioteca</h2>
        <nav>
          <input
            className="search"
            type="text"
            placeholder="Buscar juego..."
            value={filtro}
            onChange={handleBuscar}
          />
          <NavLink to="/" className={({ isActive }) => isActive ? "activo" : ""}>
            Inicio
          </NavLink>
          <NavLink to="/pc" className={({ isActive }) => isActive ? "activo" : ""}>
            PC
          </NavLink>
          <NavLink to="/xbox" className={({ isActive }) => isActive ? "activo" : ""}>
            XBOX
          </NavLink>
          <NavLink to="/psn" className={({ isActive }) => isActive ? "activo" : ""}>
            PSN
          </NavLink>
          <NavLink to="/agregar/juego" className={({ isActive }) => isActive ? "activo" : ""}>
            Agregar
          </NavLink>

        </nav>

      </div>
    </header>

  )
}
