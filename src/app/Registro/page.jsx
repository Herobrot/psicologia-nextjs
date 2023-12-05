"use client"

import "./Registro.css"
import Swal from "sweetalert2"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { saveAuthData, getAuthData, clearAuthData } from "../../../Token"



export default function Registro(){
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telef, setTelef] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [auxPass, setAuxPass] = useState("");

    const Alerta = (titulo, texto) => {
        Swal.fire({
            icon: "error",
            title: String(titulo),
            text: String(texto),
            showFonfirmButton: true,
            confirmButtonColor: "blue",
            confirmButtonText:'<i class="fa-solid fa-check"></i>',
            buttonsStyling: false,
            showConfirmButton: false,
            customClass: {
                
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-Check"
            }
        });
    }

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

        else if(/\d/.test(nombre) || /[^A-Za-z_\sÁÉÍÓÚáéíóúÑñ]/.test(nombre)){
            Alerta("¡Nombre imposible!", 
            "El nombre tiene carácteres imposibles, asegúrese de escribir un nombre correcto.");
        }

        else if(/\d/.test(apellidos) || /[^A-Za-z_\sÁÉÍÓÚáéíóúÑñ]/.test(apellidos)){
            Alerta("¡Apellido imposible!",
            "Los apellidos tienen carácteres imposibles, asegúrese de escribir solo letras.")
        }

        else if(!/^\d*$/.test(telef)){
            Alerta("¡Número de teléfono imposible!",
            "El número ingresado tiene letras o carácteres no numericos, escriba un número sin espacios/separadores")
        }

        else if(!/^\d{10,}$/.test(telef) && /^\d*$/.test(telef)){
            Alerta("¡Faltan/Sobran dígitos!", 
            "Asegúrese de haber escrito 10 dígitos en total");
        }

        else if(!(/^\w+([.]\w+)*@\w+([.]\w+)*[.][a-zA-Z]{2,5}$/.test(correo)) && correo){
            Alerta("¡Correo no bien escrito!", 
            'Consideré la siguiente referencia: "ejemplo@proveedor.com"');
        }
        
        else if(!/\w{8,}/.test(pass)){
            Alerta("¡La contraseña es muy débil!", 
            "Es recomendable que la contraseña tenga un mínimo de 8 carácteres");
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
                        const item = {
                            nombre: nombre,
                            apellidos: apellidos,
                            telefono: telef,
                            correo: correo,
                            password: pass
                        }                            
                        const response = await fetch(process.env.APIURL+"paciente", {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(item),
                    }).then(async (response) => {
                        if (response.ok) {
                            const result = await response.json();
                            console.log(result);
                            console.log(result.result._id);
                            saveAuthData(result.token,result.result._id)
                            
                        }
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
                            <div className={(!(/\d/.test(nombre) || /[^A-Za-z\sÁÉÍÓÚáéíóúÑñ]/.test(nombre))) ? "Valido" : "Invalido"}>*El nombre debería usar solo letras</div>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Apellidos" type="text"
                            value={apellidos} onChange={(ev) => {
                                setApellidos(ev.target.value)
                            }} />
                            <div className={(!(/\d/.test(apellidos) || /[^A-Za-z\sÁÉÍÓÚáéíóúÑñ]/.test(apellidos))) ? "Valido" : "Invalido"}>*El apellido debería usar solo letras</div>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Teléfono (10 digitos)" type="text"
                            value={telef} onChange={(ev) => {
                                setTelef(ev.target.value)
                            }} />
                            <div className={(/^\d*$/.test(telef) || !telef) ? "Valido" : "Invalido"}>*El teléfono debería tener solo números</div>
                            <div className={(/^\d{10,}$/.test(telef) || !telef) ? "Valido" : "Invalido"}>*El teléfono debería 10 dígitos</div>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Correo" type="email"
                            value={correo} onChange={(ev) => {
                                setCorreo(ev.target.value)
                            }} />
                            <div className={(/^\w+([.]\w+)*@\w+([.]\w+)*[.][a-zA-Z]{2,5}$/.test(correo) || !correo) ? "Valido" : "Invalido"}>*El correo debe tener el formato correcto (correo@ejemplo.com)</div>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Contraseña" type="password"
                            value={pass} onChange={(ev) => {
                                setPass(ev.target.value)
                            }} />
                            <div className={/\w{8,}/.test(pass) || !pass ? "Valido" : "Invalido"}>*La contraseña debería tener un mínimo <br /> de 8 carácteres</div>
                        </li>
                        <li>
                            <input autoComplete="no" placeholder="Confirmar contraseña" type="password"
                            value={auxPass} onChange={(ev) => {
                                setAuxPass(ev.target.value)
                            }} />
                            <div className={(auxPass === pass) || !auxPass ? "Valido" : "Invalido"}>*Las contraseñas no coinciden</div>
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