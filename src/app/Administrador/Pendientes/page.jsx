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
registerLocale('es', es);

export default function AdminPendientes(){
   
    const [contenidoPendientes, setContenidoPendientescontenidoPendientes] = useState([]);
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());
    const [filtro, setFiltro] = useState("Más antiguo");
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
                <Link href="/Administrador">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
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
                {contenidoPendientes.length > 0 ? (
                    contenidoPendientes.map((cita, index) => (
                        <div key={index}>
                       
                            <p>Fecha de la cita: {format(new Date(cita.FechaCita), 'dd/MM/yyyy')}</p>
                        </div>
                    ))
                ) : (
                    <p className="defaultTexto">Sin próximas citas.</p>
                )}
            </div>
        </div>
        </>
    );
}