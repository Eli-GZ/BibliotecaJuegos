import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import AgregarJuego from "./venta/AgregarJuego";
import EditarJuego from "./venta/EditarJuego";
import ListadoJuegos from "./venta/ListadoJuegos";
import ListadoPC from "./venta/ListadoPC";
import ListadoPSN from "./venta/ListadoPSN";
import ListadoXBOX from "./venta/ListadoXBOX";
import EditarPC from "./venta/EditarPC";
import EditarPSN from "./venta/EditarPSN";
import EditarXBOX from "./venta/EditarXBOX";


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
            <Route
              path="/editar/pc/:id_juego"
              element={
                <EditarPC />
              }
            />
            <Route path="/psn"
              element={
                <ListadoPSN />
              }
            />
             <Route
              path="/editar/psn/:id_juego"
              element={
                <EditarPSN />
              }
            />
              <Route
              path="/editar/xbox/:id_juego"
              element={
                <EditarXBOX />
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
