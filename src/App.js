import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoVentas from "./venta/ListadoVentas";
import AgregarVenta from "./venta/AgregarVenta";
import EditarVenta from "./venta/EditarVenta";
import VentasDelDia from "./venta/VentasDelDia";
import Banner from "./plantilla/Banner";

function App() {

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        {/* Sidebar fijo */}
        <Banner />
        <Navegacion />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/"
              element={
                <ListadoVentas />
              }
            />




            <Route
              path="/lista/venta"
              element={

                <ListadoVentas />

              }
            />
            <Route
              path="/agregar/venta"
              element={

                <AgregarVenta />

              }
            />
            <Route
              path="/editar/venta/:codigo_venta"
              element={

                <EditarVenta />

              }
            />
            <Route
              path="/inicio"
              element={
                <ListadoVentas />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
