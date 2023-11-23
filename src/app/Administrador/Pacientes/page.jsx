"use client"

import { faChevronLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Pacientes from "./components/Pacientes";

export default function AdminPacientes(){
    const [listaPacientes, setListaPacientes] = useState([]);
    
    return(
        <>
            <main>
                <div className="cabecera">
                    <Link href="/Administrador">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Pacientes.</h2>
                </div>
                <div className="buscador">
                    <input type="text" name="Buscador" id="" />
                    <label htmlFor="Buscador">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </label>
                </div>
                <div className="contenedorPacientes">
                    <div className={listaPacientes ? "contenidoPacientes" : "ocultarContenido"}>
                        <Pacientes pacientes={listaPacientes} />
                        <p className={listaPacientes ? "ocultarTexto" : "defaultTexto"}>
                            No hay pacientes
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}