"use client"

import "./Citas.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"

export default function Citas({citas, usuario}){
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-MX', options);
    }
    
    const Eliminar = (cita) => {
        console.log(cita);
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
                title: "swal-title",
                popup: "swal-popup",
                actions: "swal-actions",
                confirmButton: "swal-X",
                denyButton: "swal-Check"
            }
        }).then((result) => {
            if(result.isDenied){
                fetch(`https://apibuena.onrender.com/cita/${cita.user}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong');
                    }
                }).then(() => {
                    Swal.fire({
                        title: "Su cita se ha cancelado",
                        customClass:{
                            title: "swal-title",
                            actions: "swal-actions"
                        }
                    })
                  
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        })
    }
    return(
        <> 
          {citas.map(cita => {
    return(
        <div className="contenedorCita">
            <span>{formatDate(cita.FechaCita)}</span>
            <div className="contenedorBotones">
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faMinus} onClick={() => Eliminar(cita)}></FontAwesomeIcon>
            </div>
        </div>
    )
})}

        </>
    )
}