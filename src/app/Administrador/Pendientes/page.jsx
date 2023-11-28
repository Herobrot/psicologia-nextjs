"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import Link from "next/link";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Pendientes.css";
import { format } from 'date-fns';
import Swal from "sweetalert2";


registerLocale('es', es);

export default function AdminPendientes(){
   
    const [contenidoPendientes, setContenidoPendientescontenidoPendientes] = useState([]);
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());
    const [filtro, setFiltro] = useState("Más antiguo");

    const AprobarCancelar = ({cita}) =>{
        Swal.fire({
            title: "Modificar cita",
            text: "¿Desea aprobar esta cita o cancelarla?",
            showDenyButton: true,
            showConfirmButton: true,
            denyButtonText: "Cancelar",
            confirmButtonText: "Aprobar",
            denyButtonColor: "red",
            confirmButtonColor: "blue",
            focusDeny: false,
            focusConfirm: true,
            buttonsStyling: false,
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                actions: "swal-actions",
                denyButton: "swal-Cancelar",
                confirmButton: "swal-Aprobar"
            }
        }).then((result) => {
            if(result.isDenied){
                Swal.fire({
                    icon: "warning",
                    title: "A punto de cancelarla...",
                    text: "Va a cancelar la cita, ¿esta seguro de su desición?",
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
                        //Código de la api para eliminar el objeto
                        //Refrescarlo con windows.location
                    }
                })
            }
            else if(result.isConfirmed){
                Swal.fire({
                    icon: "warning",
                    title: "A punto de aprobarla...",
                    text: "Va a aprobar la cita, ¿esta seguro de su desición?",
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
                        //Código de la api para aprobar el objeto
                        //Refrescarlo con windows.location
                    }
                })
            }
        })
    }

    useEffect(() => {
        fetch('https://apibuena.onrender.com/cita/') 
            .then(response => response.json())
            .then(data => {
               console.log(data)
                const citasFiltradas = data.filter(cita => cita.EstatusCita !== "Confirmada");
                setContenidoPendientescontenidoPendientes(citasFiltradas);
            })
            .catch(error => {
                console.error('Error al obtener las citas:', error);
            });
    }, []);
    const ordenarCitas = (citas, filtroActual) => {
        return citas.sort((a, b) => {
            const fechaA = new Date(a.FechaCita);
            const fechaB = new Date(b.FechaCita);
            return filtroActual === "Más reciente" ? fechaB - fechaA : fechaA - fechaB;
        });
    };
    useEffect(() => {
        setContenidoPendientescontenidoPendientes(ordenarCitas([...contenidoPendientes], filtro));
    }, [filtro]);
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="DatePickerStyle" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));

    return(
        <main>
            <div className="cabecera">
                <a href="/Administrador">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </a>
                <h2>Pendientes.</h2>
            </div>

                <div className="filtradoTxt">
                      <br></br>Ordenar
                <div className="filtradoSelectGrid">
                    <select value={filtro} onChange={(ev) => {setFiltro(ev.target.value)}}>
                        <option value="Más antiguo">Más antiguo</option>
                        <option value="Más reciente">Más reciente</option>
                    </select>
                </div>
                </div>
                <div className="contenedorPendientes">
            <div className={contenidoPendientes.length > 0 ? "contenidoPendientes" : "ocultarContenido"}>
                {contenidoPendientes.length != 0 ? (
                    contenidoPendientes.map((cita, index) => (
                        <div key={index} onClick={() => {AprobarCancelar(cita)}}>
                            <p>Fecha de la cita: {format(new Date(cita.FechaCita), 'dd/MM/yyyy')}</p>
                        </div>
                    ))
                ) : (
                    <p className="defaultTexto">Sin próximas citas.</p>
                )}
            </div>
        </div>
        </main>
    );
}