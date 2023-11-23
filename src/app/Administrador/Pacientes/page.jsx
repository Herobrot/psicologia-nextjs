"use client"
import { faChevronLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Pacientes from "./components/Pacientes";
import { useEffect, useState } from "react";

export default function AdminPacientes(){
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
        fetch('https://apibuena.onrender.com/paciente')
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
                <div className="cabecera">
                    <Link href="/Administrador">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Pacientes.</h2>
                </div>
                <div className="buscador">
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
                <div className="contenedorPacientes">
                    <div className={pacientesFiltrados.length > 0 ? "contenidoPacientes" : "ocultarContenido"}>
                        <Pacientes pacientes={pacientesFiltrados} /> 
                        <p className={pacientesFiltrados.length == 0 ? "defaultTexto" : "ocultarTexto"}>
                            No hay pacientes
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
