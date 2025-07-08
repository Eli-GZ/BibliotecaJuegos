import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import back from "../assets/cancelar-icon.png";
import save from "../assets/save-icon.png";

export default function EditarPC() {
  const navegacion = useNavigate();

  const urlBase = "http://localhost:8080/juegos";
  const { id_juego } = useParams();

  const [plataformas, setPlataformas] = useState([]);

  const [juego, setJuego] = useState({
    nombre: "",
    imagen: "",
    unaPlataforma: null,
  });

  const [idPlataformaSeleccionada, setIdPlataformaSeleccionada] = useState("");

  // Cargar plataformas disponibles
  useEffect(() => {
    axios.get("http://localhost:8080/plataformas")
      .then(res => setPlataformas(res.data))
      .catch(err => console.error("Error cargando plataformas", err));
  }, []);

  // Cargar datos del juego a editar
  const cargarJuego = useCallback(async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id_juego}`);
      setJuego(resultado.data);
      setIdPlataformaSeleccionada(resultado.data.unaPlataforma?.idPlat?.toString() || "");
    } catch (error) {
      console.error("Error cargando juego:", error);
    }
  }, [id_juego, urlBase]);

  useEffect(() => {
    cargarJuego();
  }, [cargarJuego]);

  // Manejar cambios en inputs nombre e imagen
  const onInputChange = (e) => {
    setJuego({ ...juego, [e.target.name]: e.target.value });
  };

  // Manejar submit del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    const plataformaSeleccionada = plataformas.find(
      p => p.idPlat === parseInt(idPlataformaSeleccionada)
    );

    const juegoActualizado = {
      ...juego,
      unaPlataforma: plataformaSeleccionada || juego.unaPlataforma,
    };

    try {
      await axios.put(`${urlBase}/${id_juego}`, juegoActualizado);
      alert("El juego se modificó correctamente");
      navegacion("/pc");
    } catch (error) {
      alert("No se pudo actualizar el juego: " + error.response?.data || error.message);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className='container contenido-principal'>
      <h3 className='cont-title'>Editar Juego</h3>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              required
              value={juego.nombre || ""}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">URL de la imagen:</label>
            <input
              type="text"
              className="form-control"
              id="imagen"
              name="imagen"
              required
              value={juego.imagen || ""}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Plataforma</label>
            <select
              className="form-select"
              required
              value={idPlataformaSeleccionada}
              onChange={(e) => setIdPlataformaSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una plataforma</option>
              {plataformas.map((plat) => (
                <option key={plat.idPlat} value={plat.idPlat.toString()}>
                  {plat.version}
                </option>
              ))}
            </select>
          </div>

          <div className='text-center'>
            <button type="submit" className="btn">
              <img src={save} alt='Guardar' />
            </button>
            <Link to='/pc' className='btn'>
              <img src={back} alt='Cancelar' />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}