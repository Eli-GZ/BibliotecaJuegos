import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import AgregarJuego from "./venta/AgregarJuego";
import EditarVenta from "./venta/EditarVenta";
import ListadoJuegos from "./venta/ListadoJuegos";


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
              path="/editar/venta/:codigo_venta"
              element={

                <EditarVenta />

              }
            />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
