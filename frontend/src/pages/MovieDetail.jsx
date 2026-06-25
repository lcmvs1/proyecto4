import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../css/movieDetail.css";

function MovieDetail() {

    const { id } = useParams();

    const [pelicula, setPelicula] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        cargarPelicula();

    }, []);

    const cargarPelicula = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3001/peliculas/${id}`
            );

            setPelicula(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    if (!pelicula) {
        return <h2>Cargando...</h2>;
    }

    return (

        <div className="movie-detail">

            <div className="left">

                <h1>{pelicula.titulo}</h1>

                <img
                    src={`http://localhost:3001${pelicula.imagen_poster}`}
                    alt={pelicula.titulo}
                />

                <button className="buy-btn">
                    Comprar entradas
                </button>

                <p className="sinopsis">
                    {pelicula.sinopsis}
                </p>

                <div className="movie-extra">

                    <div className="extra-item">
                        <span>GÉNERO</span>
                        <strong>{pelicula.genero}</strong>
                    </div>

                    <div className="extra-item">
                        <span>DURACIÓN</span>
                        <strong>
                            {Math.floor(pelicula.duracion / 60)} h
                            {pelicula.duracion % 60 > 0
                                ? ` ${pelicula.duracion % 60} min`
                                : ""}
                        </strong>
                    </div>

                    <div className="extra-item">
                        <span>CLASIFICACIÓN</span>
                        <strong>{pelicula.clasificacion}</strong>
                    </div>

                    <div className="extra-item">
                        <span>ESTRENO</span>
                        <strong>26 Junio 2026</strong>
                    </div>

                    <div className="extra-item">
                        <span>DISTRIBUIDOR</span>
                        <strong>CINEMA-LS</strong>
                    </div>

                </div>

            </div>

            <div className="right">

                <h2>HORARIOS</h2>

                <div className="funciones">

                    {pelicula.funciones?.map((funcion) => (

                        <div
                            key={funcion.id}
                            className="funcion-card"
                        >

                            <h3>{funcion.fecha}</h3>

                            <p>{funcion.hora}</p>

                            <p>{funcion.precio} Bs</p>

                            <button
                                onClick={() => navigate(`/reservas/${funcion.id}`)}
                            >
                                Seleccionar
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default MovieDetail;