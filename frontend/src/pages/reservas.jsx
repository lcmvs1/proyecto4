import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import "../css/reservas.css";

import { useNavigate } from "react-router-dom";

function Reservas() {

    const { funcionId } = useParams();

    const navigate = useNavigate();

    const [funcion, setFuncion] = useState(null);

    const [ocupados, setOcupados] = useState([]);

    const [titular, setTitular] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [fechaExp, setFechaExp] = useState("");
    const [cvv, setCvv] = useState("");

    const filas = ["A", "B", "C", "D", "E", "F"];
    const columnas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [seleccionados, setSeleccionados] = useState([]);

    const [mostrarPago, setMostrarPago] = useState(false);

    const [datosPago, setDatosPago] = useState({
        nombre: "",
        tarjeta: "",
        vencimiento: "",
        cvv: ""
    });
    const seleccionarAsiento = (asiento) => {

        if (ocupados.includes(asiento)) return;

        if (seleccionados.includes(asiento)) {

            setSeleccionados(
                seleccionados.filter(a => a !== asiento)
            );

        } else {

            setSeleccionados([
                ...seleccionados,
                asiento
            ]);

        }

    };

    useEffect(() => {

        cargarFuncion();

        cargarOcupados();

    }, []);

    const cargarFuncion = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3001/funciones/${funcionId}`
            );

            setFuncion(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const cargarOcupados = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3001/reservas/ocupados/${funcionId}`
            );

            setOcupados(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const confirmarReserva = async () => {

        if (seleccionados.length === 0) {

            alert("Seleccione al menos un asiento");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:3001/reservas",

                {

                    funcionId,

                    asientos: seleccionados

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );


            setMostrarPago(false);

            navigate("/home");

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const cambiarDato = (e) => {

        setDatosPago({

            ...datosPago,

            [e.target.name]: e.target.value

        });

    };

    return (

        <div className="reservas">
            <div className="left">

                <h1>Selecciona tus asientos</h1>

                <div className="pantalla">
                    PANTALLA
                </div>

                <div className="asientos">

                    {filas.map((fila) => (

                        <div
                            key={fila}
                            className="fila"
                        >

                            <span className="letra">
                                {fila}
                            </span>

                            {columnas.map((numero) => {

                                const asiento = fila + numero;

                                return (

                                    <button

                                        key={asiento}

                                        className={

                                            ocupados.includes(asiento)

                                                ?

                                                "seat ocupado"

                                                :

                                                seleccionados.includes(asiento)

                                                    ?

                                                    "seat selected"

                                                    :

                                                    "seat"

                                        }

                                        onClick={() => seleccionarAsiento(asiento)}

                                    >

                                        {numero}

                                    </button>

                                );

                            })}

                        </div>

                    ))}

                </div>


            </div>

            <div className="right">

                <h2>RESUMEN</h2>

                <div className="info">
                    <h3>Película</h3>
                    <p>{funcion?.pelicula?.titulo}</p>
                </div>

                <div className="info">
                    <h3>Sala</h3>
                    <p>{funcion?.sala?.nombre}</p>
                </div>

                <div className="info">
                    <h3>Fecha</h3>
                    <p>{funcion?.fecha}</p>
                </div>

                <div className="info">
                    <h3>Hora</h3>
                    <p>{funcion?.hora}</p>
                </div>

                <div className="info">
                    <h3>Asientos</h3>
                    <p>{seleccionados.join(", ")}</p>
                </div>

                <div className="total">
                    Total: {funcion ? (funcion.precio * seleccionados.length).toFixed(2) : 0} Bs
                </div>

                <button
                    className="confirmar"
                    onClick={() => setMostrarPago(true)}
                >
                    Continuar al pago
                </button>

            </div>
            {
                mostrarPago && (

                    <div className="modal">

                        <div className="modal-content">

                            <h2>Pago con Tarjeta</h2>

                            <input
                                placeholder="Nombre del titular"
                                value={titular}
                                onChange={(e) => setTitular(e.target.value)}
                            />

                            <input
                                placeholder="Número de tarjeta"
                                value={tarjeta}
                                onChange={(e) => setTarjeta(e.target.value)}
                            />

                            <div className="fila-pago">

                                <input
                                    placeholder="MM/AA"
                                    value={fechaExp}
                                    onChange={(e) => setFechaExp(e.target.value)}
                                />

                                <input
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                />

                            </div>

                            <div className="botones-modal">

                                <button
                                    className="cancelar-btn"
                                    onClick={() => setMostrarPago(false)}
                                >

                                    Cancelar

                                </button>

                                <button
                                    className="pagar-btn"

                                    onClick={() => {

                                        if (
                                            titular.trim() === "" ||
                                            tarjeta.trim() === "" ||
                                            fechaExp.trim() === "" ||
                                            cvv.trim() === ""
                                        ) {

                                            alert("Complete todos los datos");
                                            return;

                                        }

                                        confirmarReserva();

                                    }}

                                >

                                    Pagar {funcion ? (funcion.precio * seleccionados.length).toFixed(2) : 0} Bs

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
        </div>

    );

}

export default Reservas;