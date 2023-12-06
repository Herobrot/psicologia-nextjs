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
    const EditarCita = (cita) => {
        Swal.fire({
            title: 'Editar Cita',
            html: `
                <input type="date" id="fecha" class="swal2-input" value="${cita.FechaCita.split('T')[0]}">
                <input type="time" id="hora" class="swal2-input" value="${cita.FechaCita.split('T')[1].substring(0, 5)}">
                <select id="modalidad" class="swal2-input">
                    <option value="Presencial" ${cita.modalidad === 'Presencial' ? 'selected' : ''}>Presencial</option>
                    <option value="En línea" ${cita.modalidad === 'En línea' ? 'selected' : ''}>En línea</option>
                </select>
            `,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            preConfirm: () => {
                const fecha = Swal.getPopup().querySelector('#fecha').value;
                const hora = Swal.getPopup().querySelector('#hora').value;
                const modalidad = Swal.getPopup().querySelector('#modalidad').value;
                return { fecha, hora, modalidad }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                
                ActualizarCita(cita, result.value);
            }
        });
    };
    const ActualizarCita = (cita, datos) => {
        fetch(process.env.NEXT_PUBLIC_APIURL+`/cita/${cita._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FechaCita: new Date(`${datos.fecha}T${datos.hora}`), 
                modalidad: datos.modalidad,
                EstatusCita: "Agendada",
                NotasCita: cita.NotasCita,
                idUser:cita.idUser
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Algo salió mal');
            }
        })
        .then(() => {
            Swal.fire('Cita Actualizada', '', 'success');
            window.location = "/Perfil";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
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
                title: "swal-title",
                popup: "swal-popup",
                actions: "swal-actions",
                confirmButton: "swal-X",
                denyButton: "swal-Check"
            }
        }).then((result) => {
            if(result.isDenied){
                fetch(process.env.NEXT_PUBLIC_APIURL+`/cita/${cita._id}`, {
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
                   window.location = "/Perfil"
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
                <FontAwesomeIcon icon={faPen} onClick={() => EditarCita(cita)}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faMinus} onClick={() => Eliminar(cita)}></FontAwesomeIcon>
            </div>
        </div>
    )
})}

        </>
    )
}