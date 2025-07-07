
export default function Navegacion() {
  return (
    <header>
      <div className="contenedor">
        <h2 className="logotipo">Biblio-Juegos</h2>
        <nav>
          <a href="/" className="activo">Todos los juegos</a>
          <a href="s">PSNetwork</a>
          <a href="s">XBOX live</a>
          <a href="s">PC</a>
          <a href="/agregar/juego">Agregar juego</a>
        </nav>
      </div>
    </header>

  )
}
