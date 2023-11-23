"use client"

import { faCalendarDay, faFileLines, faUsers, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Swal from "sweetalert2"
import "./Administrador.css"

export default function Admin(){
    const Salir = () => {
        Swal.fire({
            title: "¡Hasta la próxima!",
            text: "Esta apunto de salir. ¿Quiere continuar?",
            showDenyButton: true,
            showConfirmButton: true,
            denyButtonText: "No",
            confirmButtonText: "Sí",
            denyButtonColor: "red",
            confirmButtonColor: "blue",
            focusDeny: false,
            focusConfirm: true,
            buttonsStyling: false,
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                actions: "swal-actions",
                denyButton: "swal-No",
                confirmButton: "swal-Si"
            }
        }).then((result) => {
            if(result.isConfirmed){
                window.location="/"
            }
        })
    }

    return(
        <>
            <main>
                <FontAwesomeIcon icon={faRightFromBracket} onClick={() => Salir()} className="fa-flip-horizontal" /> 
                <h1>Administración</h1>
                <div className="listaNav">
                    <div className="boton">
                        <FontAwesomeIcon icon={faUsers} />
                        <a href={"/Administrador/Pacientes"}>
                            Pacientes
                        </a>
                    </div>
                    <div className="boton">
                        <FontAwesomeIcon icon={faCalendarDay} />
                        <a href={"/Administrador/Pendientes"}>
                            Citas por aprobar
                        </a>
                    </div>
                    <div className="boton">
                        <FontAwesomeIcon icon={faFileLines} />
                        <a href={"/Administrador/Historial"}>
                            Historial
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}