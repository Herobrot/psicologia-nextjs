"use client"

import "./Historial.css"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { format } from "date-fns/esm"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PacienteIndividual({params}){
    const searchParams = useSearchParams();
    const pacienteHistorial = JSON.parse(searchParams.get("pacienteHistorial"));
    console.log(pacienteHistorial.citas);

    //Requiero useEffect para abstraer las citas con las _id de pacienteHistorial
    return(
        <>
            <main>
                <div className="cabeceraHistorial">
                    <Link href={{
                        pathname: `/Administrador/Pacientes/${pacienteHistorial.nombre}`,
                        query: { paciente: JSON.stringify(pacienteHistorial) },
                    }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Información.</h2>
                </div>
                <div className="contenedorHistorial">
                    {pacienteHistorial.citas.map(cita => {
                        
                    })}
                </div>                
            </main>
        </>
    )
}