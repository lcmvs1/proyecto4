import { useEffect, useState } from "react";
import axios from "axios";

function SalasAdmin() {

    const [nombre, setNombre] = useState("");
    const [filas, setFilas] = useState("");
    const [columnas, setColumnas] = useState("");

    const [salas, setSalas] = useState([]);

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {

        cargarSalas();

    }, []);

    const cargarSalas = async () => {

        const response = await axios.get(
            "http://localhost:3001/salas"
        );

        setSalas(response.data);

    };

    const guardarSala = async (e) => {

        e.preventDefault();
        if (!nombre || !filas || !columnas) {
            alert("Debe completar todos los campos.");
            return;
        }

        const token = localStorage.getItem("token");

        const datos = {

            nombre,
            filas,
            columnas

        };

        if (editando) {

            await axios.patch(

                `http://localhost:3001/salas/${idEditar}`,

                datos,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

        } else {

            await axios.post(

                "http://localhost:3001/salas",

                datos,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

        }

        setNombre("");
        setFilas("");
        setColumnas("");

        setEditando(false);
        setIdEditar(null);

        cargarSalas();

    };

    const editarSala = (sala) => {

        setEditando(true);

        setIdEditar(sala.id);

        setNombre(sala.nombre);
        setFilas(sala.filas);
        setColumnas(sala.columnas);

    };

    const eliminarSala = async (id) => {

        const token = localStorage.getItem("token");

        await axios.delete(

            `http://localhost:3001/salas/${id}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        cargarSalas();

    };

    return (

        <>

            <h2>Gestión de Salas</h2>

            <form onSubmit={guardarSala}>

                <input
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Filas"
                    value={filas}
                    onChange={(e) => setFilas(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Columnas"
                    value={columnas}
                    onChange={(e) => setColumnas(e.target.value)}
                />

                <input
                    value={(filas || 0) * (columnas || 0)}
                    disabled
                />

                <button type="submit">

                    {editando ? "Actualizar Sala" : "Guardar Sala"}

                </button>

            </form>

            <table className="tabla-peliculas">

                <thead>

                    <tr>

                        <th>Nombre</th>
                        <th>Filas</th>
                        <th>Columnas</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        salas.map((sala) => (

                            <tr key={sala.id}>

                                <td>{sala.nombre}</td>

                                <td>{sala.filas}</td>

                                <td>{sala.columnas}</td>

                                <td>{sala.capacidad_total}</td>

                                <td>

                                    <button
                                        onClick={() => editarSala(sala)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => eliminarSala(sala.id)}
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

export default SalasAdmin;