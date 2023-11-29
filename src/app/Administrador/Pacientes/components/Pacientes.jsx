import Link from "next/link";
import "./Pacientes.css"

export default function Pacientes({pacientes}){
    return(
        <>
            {pacientes.map(paciente => {
                return(
                    <Link href="/Administrador/Pacientes">
                        <div className="contenedorPaciente" key={paciente._id}>
                            <span>{paciente.nombre + " " + paciente.apellidos}</span>
                        </div>
                    </Link>
                )
            })}
        </>
    );
}