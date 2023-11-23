import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PacienteIndividual({params}){
    //slug es el nombre del paciente (/Administrador/Pacientes/Pablo)
    return(
        <>
            <main>
                <div className="cabecera">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <h2>Información.</h2>
                </div>
                <div className={"contenedorPaciente" + params.slug}>
                    <h4>Nombre</h4>
                    <div></div>{/*Ingresa dentro del div los parametros del paciente*/}
                    <h4>Apellidos</h4>
                    <div></div>{/*Ingresa dentro del div los parametros del paciente*/}
                    <h4>Teléfono</h4>
                    <div></div>{/*Ingresa dentro del div los parametros del paciente*/}
                    <h4>Correo</h4>
                    <div></div>{/*Ingresa dentro del div los parametros del paciente*/}
                </div>
                <div className="contenedorBotones">
                    
                </div>
            </main>
        </>
    )
}