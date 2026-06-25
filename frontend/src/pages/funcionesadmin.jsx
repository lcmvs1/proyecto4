import { useEffect, useState } from "react";
import axios from "axios";

function FuncionesAdmin() {

    const [peliculas, setPeliculas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [funciones, setFunciones] = useState([]);

    const [peliculaId, setPeliculaId] = useState("");
    const [salaId, setSalaId] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [precio, setPrecio] = useState("");

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {

        cargarPeliculas();
        cargarSalas();
        cargarFunciones();

    }, []);

    const cargarPeliculas = async () => {

        const res = await axios.get("http://localhost:3001/peliculas");
        setPeliculas(res.data);

    }

    const cargarSalas = async () => {

        const res = await axios.get("http://localhost:3001/salas");
        setSalas(res.data);

    }

    const cargarFunciones = async () => {

        const res = await axios.get("http://localhost:3001/funciones");
        setFunciones(res.data);

    }
    const guardarFuncion = async (e) => {

        e.preventDefault();

        if (
            !peliculaId ||
            !salaId ||
            !fecha ||
            !hora ||
            !precio
        ) {
            alert("Debe completar todos los campos.");
            return;
        }

        const token = localStorage.getItem("token");

        const datos = {

            PeliculaId: peliculaId,
            SalaId: salaId,
            fecha,
            hora,
            precio

        };

        try {

            if (editando) {

                await axios.patch(

                    `http://localhost:3001/funciones/${idEditar}`,

                    datos,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

            } else {

                await axios.post(

                    "http://localhost:3001/funciones",

                    datos,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

            }

            setPeliculaId("");
            setSalaId("");
            setFecha("");
            setHora("");
            setPrecio("");

            setEditando(false);
            setIdEditar(null);

            cargarFunciones();

        } catch (error) {

            alert(error.response.data.message);

        }

    }
    const editarFuncion = (funcion) => {

        setEditando(true);

        setIdEditar(funcion.id);

        setPeliculaId(funcion.pelicula.id);
        setSalaId(funcion.sala.id);
        setFecha(funcion.fecha);
        setHora(funcion.hora.substring(0, 5));
        setPrecio(funcion.precio);

    }

    const eliminarFuncion = async (id) => {

        const token = localStorage.getItem("token");

        await axios.delete(

            `http://localhost:3001/funciones/${id}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        cargarFunciones();

    }

    return (

        <>

            <h2>Gestión de Funciones</h2>

            <form onSubmit={guardarFuncion}>

                <select
                    value={peliculaId}
                    onChange={(e) => setPeliculaId(e.target.value)}
                >

                    <option value="">Película</option>

                    {

                        peliculas.map(p => (

                            <option
                                key={p.id}
                                value={p.id}
                            >

                                {p.titulo}

                            </option>

                        ))

                    }

                </select>

                <select
                    value={salaId}
                    onChange={(e) => setSalaId(e.target.value)}
                >

                    <option value="">Sala</option>

                    {

                        salas.map(s => (

                            <option
                                key={s.id}
                                value={s.id}
                            >

                                {s.nombre}

                            </option>

                        ))

                    }

                </select>

                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />

                <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />

                <button>

                    {editando ? "Actualizar Función" : "Guardar Función"}

                </button>

            </form>

            <table className="tabla-peliculas">

                <thead>

                    <tr>

                        <th>Película</th>
                        <th>Sala</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Precio</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        funciones.map(f => (

                            <tr key={f.id}>

                                <td>{f.pelicula.titulo}</td>

                                <td>{f.sala.nombre}</td>

                                <td>{f.fecha}</td>

                                <td>{f.hora}</td>

                                <td>{f.precio} Bs</td>

                                <td>

                                    <button
                                        onClick={() => editarFuncion(f)}
                                    >

                                        Editar

                                    </button>

                                    <button
                                        onClick={() => eliminarFuncion(f.id)}
                                    >

                                        Eliminar

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </>

    );

}

export default FuncionesAdmin;