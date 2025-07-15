import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import back from "../assets/cancelar-icon.png"
import save from "../assets/save-icon.png"

export default function AgregarJuego({ recargarJuegos }) {
  let Navegacion = useNavigate();
  const urlBase = "http://localhost:8080/juegos";

  const [plataforma, setPlataformas] = useState([]);


  const [juegos, setJuegos] = useState({
    nombre: "",
    imagen: "",
    unaPlataforma: []
  });

  useEffect(() => {
    axios.get("http://localhost:8080/plataformas")
      .then(res => setPlataformas(res.data))
      .catch(err => console.error("Error cargando plataformas", err));
  }, []);

  useEffect(() => {
    axios.get(urlBase)
      .then(res => setJuegos(res.data))
      .catch(err => console.error("Error cargando juegos", err));
  }, []);

  const onInputChange = (e) => {
    setJuegos({ ...juegos, [e.target.name]: e.target.value })
  }

  // Cambio cliente seleccionado
  const onPlataformaChange = (e) => {
    const PlatSeleccionado = plataforma.find(
      c => c.idPlat === parseInt(e.target.value)
    );
    setJuegos({ ...juegos, unaPlataforma: PlatSeleccionado || {} });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!juegos.unaPlataforma?.idPlat) {
      alert("Debe seleccionar un cliente.");
      return;
    }

    const juegoAEnviar = {
      nombre: juegos.nombre,
      imagen: juegos.imagen,
      unaPlataforma: { idPlat: juegos.unaPlataforma.idPlat }
    };

    try {
      await axios.post("http://localhost:8080/juegos", juegoAEnviar);
      await recargarJuegos();
      Navegacion("/");
    } catch (error) {
      alert("No se pudo crear el juego: " + (error.response?.data || error.message));
      console.error("Error:", error.response?.data || error.message);
    }
  };



  return (
    <div className='container contenido-principal'>
      <div className=''>
        <h3 className='cont-title'>Agregar Juego Nuevo</h3>
      </div>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control " id="nombre" name="nombre"
              required={true} value={juegos.nombre} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">URL de lmagen:</label>
            <input type="text" className="form-control" id="imagen" name="imagen"
              required={true} value={juegos.imagen} onChange={(e) => onInputChange(e)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Plataforma</label>
            <select
              className="form-select"
              required
              value={juegos.unaPlataforma?.idPlat || ""}
              onChange={onPlataformaChange}
            >
              <option value="">Seleccione una plataforma</option>
              {plataforma.map(plat => (
                <option key={plat.idPlat} value={plat.idPlat}>
                  {plat.version}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className='text-center'>
            <button type="submit" className="btn"><img src={save} alt=''></img></button>
            <Link to='/' className='btn'><img src={back} alt=''></img></Link>
          </div>
        </form>
      </div>
    </div>
  );
}