"use client"

import "./Paciente.css"
import { faChevronLeft, faComments, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PacienteIndividual({params}){
    const searchParams = useSearchParams();
    const paciente = JSON.parse(searchParams.get("paciente"))
    return(
        <>
            <main>
                <div className="cabeceraPaciente">
                    <Link href="/Administrador/Pacientes">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Información.</h2>
                </div>
                <div className="contenedorPaciente">
                    <h4>Nombre</h4>
                    <div>
                        {paciente.nombre}
                    </div>
                    <h4>Apellidos</h4>
                    <div>
                        {paciente.apellidos}
                    </div>
                    <h4>Teléfono</h4>
                    <div>
                        {paciente.telefono}
                    </div>
                    <h4> Correo</h4>
                    <div>
                        {paciente.correo ? (
                            <>{paciente.correo}</>
                        ): (
                            <>No hay correo</>
                        )}
                    </div>
                </div>
                <div className="contenedorBotones">                    
                    <Link href={{
                        pathname: `/Administrador/Pacientes/${paciente.nombre}/Historial`,
                        query: { pacienteHistorial: JSON.stringify(paciente) }
                        }}>
                        <FontAwesomeIcon id="historial" icon={faCalendar} />
                        <button id="historial" type="button">Ver historial</button>
                    </Link>                                        
                    <Link href={{
                        pathname: `/Administrador/Pacientes/${paciente.nombre}/Chat`,
                        query: { pacienteChat: JSON.stringify(paciente)}
                        }}>
                        <FontAwesomeIcon id="chat" icon={faComments} />
                        <button id="chat" type="button">Abrir chat</button>
                    </Link>                    
                </div>
            </main>
        </>
    )
}