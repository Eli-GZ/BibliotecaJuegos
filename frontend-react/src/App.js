import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import AgregarJuego from "./venta/AgregarJuego";
import EditarJuego from "./venta/EditarJuego";
import ListadoJuegos from "./venta/ListadoJuegos";
import ListadoPC from "./venta/ListadoPC";
import ListadoPSN from "./venta/ListadoPSN";
import ListadoXBOX from "./venta/ListadoXBOX";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navegacion />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/"
              element={
                <ListadoJuegos />
              }
            />
            <Route
              path="/agregar/juego"
              element={
                <AgregarJuego />
              }
            />
            <Route
              path="/editar/juego/:id_juego"
              element={
                <EditarJuego />
              }
            />
            <Route path="/pc"
              element={
                <ListadoPC />
              }
            />
            <Route path="/psn"
              element={
                <ListadoPSN />
              }
            />
            <Route path="/xbox"
              element={
                <ListadoXBOX />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
