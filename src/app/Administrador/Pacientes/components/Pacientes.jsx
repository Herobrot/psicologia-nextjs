import Link from "next/link";
import "./Pacientes.css"

export default function Pacientes({pacientes}){
    return(
        <>
            {pacientes.map(paciente => {
                return(
                    <Link href={{
                        pathname: `/Administrador/Pacientes/${paciente.nombre}`,
                        query: { paciente: JSON.stringify(paciente) },
                    }}>
                        <div className="contenedorPaciente" key={paciente._id}>
                            <span>{paciente.nombre + " " + paciente.apellidos}</span>
                        </div>
                    </Link>
                )
            })}
        </>
    );
}