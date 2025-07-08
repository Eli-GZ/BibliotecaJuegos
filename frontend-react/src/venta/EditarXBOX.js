import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import back from "../assets/cancelar-icon.png"
import save from "../assets/save-icon.png"

export default function EditarJuego() {
  let Navegacion = useNavigate();

  const urlBase = "http://localhost:8080/juegos";
  const { id_juego } = useParams();

  const [plataforma, setPlataformas] = useState([]);

  const [juegos, setJuegos] = useState({
    nombre: "",
    imagen: "",
    unaPlataforma: null, 
  });

  useEffect(() => {
    axios.get("http://localhost:8080/plataformas")
      .then(res => setPlataformas(res.data))
      .catch(err => console.error("Error cargando plataformas", err));
  }, []);

  const cargarjuego = useCallback(async () => {
    const resultado = await axios.get(`${urlBase}/${id_juego}`)
    setJuegos(resultado.data)
  }, [id_juego, urlBase]);


  useEffect(() => {
    cargarjuego();
  }, [cargarjuego]);

  const onInputChange = (e) => {
    setJuegos({ ...juegos, [e.target.name]: e.target.value })
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    const plataformaSeleccionada = plataforma.find(p => p.idPlat === parseInt(juegos.unaPlataforma));

    const juegosActualizados = {
      ...juegos,
      unaPlataforma: plataformaSeleccionada || null
    };

    try {
      await axios.put(`${urlBase}/${id_juego}`, juegosActualizados);
      alert("El producto se modificó correctamente");
      Navegacion("/");
    } catch (error) {
      alert("No se pudo actualizar la venta " + error.response?.data);
      console.error("Error:", error.response?.data || error.message);
    }
  }


  return (
    <div className='container contenido-principal'>
      <div className=''>
        <h3 className='cont-title'>Editar Juego Nuevo</h3>
      </div>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control " id="nombre" name="nombre"
              required={true} value={juegos.nombre} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen:</label>
            <input type="text" className="form-control" id="imagen" name="imagen"
              required={true} value={juegos.imagen} onChange={(e) => onInputChange(e)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Plataforma</label>
            <select
              className="form-select"
              required
              value={juegos.unaPlataforma?.idPlat || juegos.unaPlataforma || ""}
              onChange={(e) => {
                const idSeleccionado = parseInt(e.target.value);
                setJuegos({ ...juegos, unaPlataforma: idSeleccionado });
              }}
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