"use client"

import "./Perfil.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Citas from "./components/Citas";

export default function Perfil(){
    const usuario = {
        nombre: "Daniel",
        apellidos: "Madrigal Schimt",
        telefono: "9681001234",
        correo: "example@gmail.com",
        municipio: "Suchiapa",
        estado: "Chiapas",
        password: "Password"
    };
    const [contenidoCitas, setContenidoCitas] = useState([]);
    const [existeCC, setExisteCC] = useState(false);
    const hayContenidoNotas = false;

    useEffect(() => {
        const cita = [{
            FechaCita: "20 de Octubre - 04:30 PM",
            EstatusCita: "Agendada"
        },
        {
            FechaCita: "25 de Octubre - 10:30 PM",
            EstatusCita: "Agendada"
        },
        {
            FechaCita: "26 de Octubre - 10:30 PM",
            EstatusCita: "Agendada"
        },
        {
            FechaCita: "27 de Octubre - 10:30 PM",
            EstatusCita: "Agendada"
        },]

        setContenidoCitas(cita)
        setExisteCC(true)
    }, [])
    return(
        <>
            <main>
                <h1>¡Hola!, {usuario.nombre}</h1>
                <div className="proximasCitas">
                    <p>Proximas citas:</p>
                    <div className="contenedorProCit">
                        <div className={existeCC ? "contenidoCitas" : "ocultarContenido"}>
                            <Citas citas={contenidoCitas} usuario={usuario} />
                            <p className={existeCC ? "ocultarTexto" : "defaultTexto"}>
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