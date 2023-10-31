"use client"

import "./Perfil.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";


export default function Perfil(){
    const usuario = "Daniel";
    const contenidoCitas = {};
    const hayContenidoCitas = false;
    const hayContenidoNotas = false;
    return(
        <>
            <main>
                <h1>¡Hola!, {usuario === "Daniel" ? "Daniel" : "Persona"}</h1>
                <div className="proximasCitas">
                    <p>Proximas citas:</p>
                    <div className="contenedorProCit">
                        <div className={hayContenidoCitas ? "contenidoCitas" : "ocultarContenido"}>
                            <p className={hayContenidoCitas ? "ocultarTexto" : "defaultTexto"}>
                                No tiene proximas citas.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="notasPsicologa">
                    <p>Notas de la psicologa:</p>
                    <div className="contenedorNotas">
                        <div className={hayContenidoNotas ? "contenidoNotas" : "ocultarContenido"}>
                            <p className={hayContenidoNotas ? "ocultarTexto" : "defaultTexto"}>
                                No hay notas.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="botonesNav">
                    <button type="button" title="Cerrar Sesión" onClick={() => {
                        window.location= "/"
                    }}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                    <button type="button" title="Abrir información personal">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </button>
                    <button type="button" title="Agendar Cita">
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </button>
                </div>
            </main>
        </>
    )
}