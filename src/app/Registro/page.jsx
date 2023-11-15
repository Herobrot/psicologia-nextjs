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
    const [auxPass, setAuxPass] = useState("");
    const Salir = () => {
        if(!nombre && !apellidos && !telef && !correo && !pass){
            window.location="/"
        }

        else if(nombre || apellidos || telef || correo || pass ){
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
        if(!nombre || !apellidos || !telef || !pass){
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
            }).then(async (result) => {
                if(result.isDenied){
                    try{
                        const correoValido = /^\w+([.]\w+)*@\w+([.]\w+)*[.][a-zA-Z]{2,5}$/.test(correo);
                        const nombreValido = !(/\d/.test(nombre));
                        const apellidosValido = !(/\d/.test(apellidos));
                        const passValido = pass === auxPass;
                        const telfValido = (/\d/.test(telef) && telef.length === 10);
                        const item = {
                            nombre: nombre,
                            apellidos: apellidos,
                            telefono: telef,
                            correo: correo,
                            password: pass
                        }                            
                        const result = await fetch("https://apibuena.onrender.com/paciente", {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(item),
                    })
                        
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
                        if((correoValido || !correo) && nombreValido && apellidosValido && passValido && telfValido){                            
                            
                        }

                        else{                           
                        }
                                                
                    } catch(err){
                        Swal.fire({
                            title: "Ha sucedido un error al subir los datos"
                        });
                    }                
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
                            <span className={(!/\d/.test(nombre)) ? "Valido" : "Invalido"}>*El nombre no debería de tener números</span>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Apellidos" type="text"
                            value={apellidos} onChange={(ev) => {
                                setApellidos(ev.target.value)
                            }} />
                            <span className={(!/\d/.test(apellidos)) ? "Valido" : "Invalido"}>*El apellido no debería de tener números</span>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Teléfono (10 digitos)" type="text"
                            value={telef} onChange={(ev) => {
                                setTelef(ev.target.value)
                            }} />
                            <span className={(/\d/.test(telef) || !telef) ? "Valido" : "Invalido"}>*El teléfono debería tener solo números</span>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Correo" type="email"
                            value={correo} onChange={(ev) => {
                                setCorreo(ev.target.value)
                            }} />
                            <span className={(/^\w+([.]\w+)*@\w+([.]\w+)*[.][a-zA-Z]{2,5}$/.test(correo) || !correo) ? "Valido" : "Invalido"}>*El correo debe tener el formato correcto (correo@ejemplo.com)</span>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Contraseña" type="password"
                            value={pass} onChange={(ev) => {
                                setPass(ev.target.value)
                            }} />
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Confirmar contraseña" type="password"
                            value={auxPass} onChange={(ev) => {
                                setAuxPass(ev.target.value)
                            }} /><br />
                            <span className={(auxPass === pass) ? "Valido" : "Invalido"}>*Las contraseñas no coinciden</span>
                        </li>
                    </ul>
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