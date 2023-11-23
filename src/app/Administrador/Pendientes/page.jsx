"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from "date-fns/locale";
import { useState } from "react";
import Link from "next/link";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Pendientes.css";

registerLocale('es', es);

export default function AdminPendientes(){
    //Constante que almacenara el arreglo de citas ya realizadas
    const [contenidoPendientes, setContenidoPendientescontenidoPendientes] = useState([]);
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());
    const [filtro, setFiltro] = useState("Más antiguo");
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
                <div className={contenidoPendientes ? "contenidoPendientes" : "ocultarContenido"}>
                    {/*Implementar aquí <Citas />*/}
                    <p className={contenidoPendientes ? "ocultarTexto" : "defaultTexto"}>Sin proximas citas.</p>
                </div>
            </div>
        </main>
    );
}