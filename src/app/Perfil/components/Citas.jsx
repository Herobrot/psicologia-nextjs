"use client"

import "./Citas.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"

export default function Citas({citas, usuario}){
    const Eliminar = (cita) => {
        Swal.fire({
            title: "¿Desea cancelar su cita?",
            text: cita.FechaCita + " " + usuario.nombre + " " + usuario.apellidos,
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonColor: "red",
            denyButtonColor: "blue",
            confirmButtonText: '<i class="fa-solid fa-xmark"></i>',
            denyButtonText:'<i class="fa-solid fa-check"></i>',
            buttonsStyling: false,
            customClass: {
                htmlContainer: "swal-html",
                title: "swal-title",
                popup: "swal-popup",
                actions: "swal-actions",
                confirmButton: "swal-X",
                denyButton: "swal-Check"
            }
        })
    }
    return(
        <>
            {citas.map(cita => {
                return(
                    <div className="contenedorCita">
                        <span>{cita.FechaCita}</span>
                        <div className="contenedorBotones">
                            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faMinus}
                            onClick={() => Eliminar(cita)}></FontAwesomeIcon>
                        </div>
                    </div>
                )
            })}
        </>
    )
}