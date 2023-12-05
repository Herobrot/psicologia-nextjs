"use client"
import { faChevronLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Pacientes from "./components/Pacientes";
import { useEffect, useState } from "react";
import "./Pacientes.css";

export default function AdminPacientes() {
    const [listaPacientes, setListaPacientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const handleSearchChange = (e) => {
        setBusqueda(e.target.value);
    };

    const pacientesFiltrados = listaPacientes.filter(paciente => {
        const nombre = paciente.nombre || "";
        const apellido = paciente.apellido || "";
        return nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            apellido.toLowerCase().includes(busqueda.toLowerCase());
    });

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_APIURL_PACIENTE)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los pacientes');
                }
            })
            .then(data => {
                setListaPacientes(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <main>
                <div className="cabeceraPacientes">
                    <a href="/Administrador">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                    <h2>Pacientes.</h2>
                </div>
                <div className="buscadorPacientes">
                    <input
                        type="text"
                        name="Buscador"
                        id="Buscador"
                        value={busqueda}
                        onChange={handleSearchChange}
                    />
                    <label htmlFor="Buscador">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </label>
                </div>
                <div className={pacientesFiltrados.length > 0 ? "contenedorPacientes" : "ocultarContenido"}>
                    {pacientesFiltrados.length > 0 ? (
                        <div className="contenidoPacientes">
                            <Pacientes pacientes={pacientesFiltrados} />
                        </div>
                    ) : (
                        <p className="defaultTexto">
                            No hay pacientes
                        </p>
                    )}
                </div>

            </main>
        </>
    );
}
