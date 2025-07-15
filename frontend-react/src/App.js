import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import AgregarJuego from "./juegos/AgregarJuego";
import EditarJuego from "./juegos/EditarJuego";
import ListadoJuegos from "./juegos/ListadoJuegos";
import ListadoPC from "./juegos/ListadoPC";
import ListadoPSN from "./juegos/ListadoPSN";
import ListadoXBOX from "./juegos/ListadoXBOX";
import EditarPC from "./juegos/EditarPC";
import EditarPSN from "./juegos/EditarPSN";
import EditarXBOX from "./juegos/EditarXBOX";
import { useEffect, useState } from "react";
import axios from "axios";

function AppContent() {
  const [juegos, setJuegos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const location = useLocation();

  useEffect(() => {
    setFiltro(""); // Limpia el filtro al cambiar de ruta
  }, [location.pathname]);

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    const res = await axios.get("http://localhost:8080/juegos");
    setJuegos(res.data);
  };

  const eliminarJuego = async (id_juego) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este juego?");
    if (confirmacion) {
      await axios.delete(`http://localhost:8080/juegos/${id_juego}`);
      await cargarJuegos();
      alert("El juego se eliminó correctamente");
    }
  };

  const juegosFiltrados = juegos.filter(juego =>
    juego.nombre.toLowerCase().startsWith(filtro.toLowerCase())
  );

  return (
    <>
      <Navegacion filtro={filtro} setFiltro={setFiltro} />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/"
            element={<ListadoJuegos juegos={juegosFiltrados} onEliminar={eliminarJuego} />} />
          <Route path="/agregar/juego"
            element={<AgregarJuego recargarJuegos={cargarJuegos} />} />
          <Route path="/editar/juego/:id_juego"
            element={<EditarJuego recargarJuegos={cargarJuegos} />} />
          <Route path="/pc"
            element={<ListadoPC juegos={juegosFiltrados} onEliminar={eliminarJuego} />} />
          <Route path="/editar/pc/:id_juego"
            element={<EditarPC recargarJuegos={cargarJuegos} />} />
          <Route path="/psn"
            element={<ListadoPSN juegos={juegosFiltrados} onEliminar={eliminarJuego} />} />
          <Route path="/editar/psn/:id_juego"
            element={<EditarPSN recargarJuegos={cargarJuegos} />} />
          <Route path="/editar/xbox/:id_juego"
            element={<EditarXBOX recargarJuegos={cargarJuegos} />} />
          <Route path="/xbox"
            element={<ListadoXBOX juegos={juegosFiltrados} onEliminar={eliminarJuego} />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}