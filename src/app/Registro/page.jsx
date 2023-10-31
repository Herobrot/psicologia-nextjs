"use client"

import "./Registro.css"
import Swal from "sweetalert2"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"



export default function Registro(){
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telef, setTelef] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [estado, setEstado] = useState("");

    const Salir = () => {
        if(!nombre && !apellidos && !telef && !correo && !pass && !municipio && !estado){
            window.location="/"
        }

        else if(nombre || apellidos || telef || correo || pass || municipio || estado){
            Swal.fire({
                title: "¡Hay datos guardados!",
                text: "Esta apunto de salir. ¿Quiere terminar en llenar el formulario?",
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
                if(result.isDenied){
                    window.location="/"
                }
            })
        }
    }

    const Continuar = () => {
        if(!nombre || !apellidos || !telef || !correo || !pass || !municipio || !estado){
            Swal.fire({
                title: "¡Faltan datos!",
                text: "Revise que haya ingresado todos los datos",
                showFonfirmButton: true,
                confirmButtonColor: "blue",
                confirmButtonText:'<i class="fa-solid fa-check"></i>',
                buttonsStyling: false,
                showConfirmButton: false,
                customClass: {
                    popup: "swal-popup",
                    confirmButton: "swal-Check"
                }
            })
        }

        else{
            Swal.fire({
                title: "¿Confirmar datos?",
                text: "Si aun no esta seguro, puede modificarlos.",
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
            }).then((result) => {
                if(result.isDenied){
                    Swal.fire({
                        title: "¡Datos confirmados!",
                        text: "¡Listo!, ya tiene una cuenta para hacer una cita",
                        showConfirmButton: true,
                        confirmButtonColor: "blue",
                        confirmButtonText:'<i class="fa-solid fa-check"></i>',
                        buttonsStyling: false,                        
                        customClass: {
                            title: "swal-title",
                            popup: "swal-popup",
                            confirmButton: "swal-Check"
                        } 
                    }).then((result) => {
                        if(result.isConfirmed){
                            window.location = "/Perfil"
                        }
                        else if(result.isDismissed){
                            window.location = "/Perfil"
                        }
                    })
                }
            })
        }
    }

    return(
        <>
            <main>
                <h1>Ingrese sus datos</h1>
                <p>Para continuar, debes rellenar los campos que se piden.</p>
                <div>
                    <ul>
                        <li>
                            <input autoComplete="no" placeholder="Nombre" type="text"
                            value={nombre} onChange={(ev) => {
                                setNombre(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Apellidos" type="text"
                            value={apellidos} onChange={(ev) => {
                                setApellidos(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Teléfono (10 digitos)" type="text"
                            value={telef} onChange={(ev) => {
                                setTelef(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Correo" type="email"
                            value={correo} onChange={(ev) => {
                                setCorreo(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Contraseña" type="password"
                            value={pass} onChange={(ev) => {
                                setPass(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Municipio" type="text"
                            value={municipio} onChange={(ev) => {
                                setMunicipio(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Estado" type="text"
                            value={estado} onChange={(ev) => {
                                setEstado(ev.target.value)
                            }} />
                        </li>
                    </ul>
                    <input type="radio" name="Btn-C" id="Btn-C" />
                    <input type="radio" name="Btn-C" id="Btn-C" />
                </div>
                <div className="buttons">
                    <button type="button" className="x" onClick={() => {
                        Salir();
                    }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button type="button" className="check" onClick={() => {
                            Continuar();
                        }}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>
            </main>
        </>
    )
}