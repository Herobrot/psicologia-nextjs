"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAuthData, getAuthData, clearAuthData,IniciarSesion } from "../../../Token";
import "./Login.css";

export default function Login() {
    const apiPaciente = process.env.NEXT_PUBLIC_APIURL_PACIENTE
    const [credentials, setCredentials] = useState({ telefono: '', password: '',correo:'' });
    const handleInputChange = (e) => {
     
        if (e.target.name === 'usernameOrPhone') {
            if (e.target.value.includes('@')) {
             
                setCredentials({ ...credentials, correo: e.target.value, telefono: '' });
            } else {
                
                setCredentials({ ...credentials, telefono: e.target.value, correo: '' });
            }
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    };

    const login = () => {
        if (credentials.password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres.',
            });
            return;
        }
        IniciarSesion(credentials.password,credentials.correo)

        fetch(apiPaciente+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                clearAuthData();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Inicio de sesión fallido.',
                });
            } else {
                console.log(data);
                saveAuthData(data.token, data.user._id);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Inicio de sesión exitoso.',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "/Perfil";
                    }

                    if(result.isDismissed){
                        window.location = "/Perfil";
                    }
                });
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema con la petición.',
            });
        });
    };

 
    return (
        <>
            <main>
                <a href="/" title="Inicio">
                    <FontAwesomeIcon title="Inicio" icon={faArrowRightFromBracket} id="icono" className="fa-flip-horizontal" />
                </a>
                <h1>Iniciar sesión</h1>
                <p>Para continuar, debes iniciar sesión o crear una cuenta.</p>
                <div>
                    <input type="text" name="usernameOrPhone" onChange={handleInputChange} placeholder="Teléfono/Correo" />
                    <input type="password" name="password" onChange={handleInputChange} placeholder="Contraseña" />
                    <br />
                    <button onClick={login} id="btn-IS">Iniciar sesión</button>
                    <br />
                    <p>¿Olvidó su contraseña?</p>
                    <a href="" className="btn">Recuperar cuenta</a>
                    <p>¿Aún no tiene una cuenta?</p>
                    <a href="/Registro" className="btn">Crear cuenta</a>
                </div>
            </main>
        </>
    );
}
