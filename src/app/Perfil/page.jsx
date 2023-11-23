"use client"

import "./Perfil.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Citas from "./components/Citas";
import { saveAuthData, getAuthData, clearAuthData } from "../../../Token"
export default function Perfil() {

    const authData = getAuthData();
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        correo: "",
        municipio: "",
        estado: "",
        password: ""
    });
    const [contenidoCitas, setContenidoCitas] = useState([]);
    const [notaMasReciente, setNotaMasReciente] = useState('');
    const hayContenidoNotas = false;
    useEffect(() => {

        fetch('https://apibuena.onrender.com/paciente/' + authData.userId, {
            headers: {
                'Authorization': `${authData.token}`,
                'Content-Type': 'application/json'

            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    clearAuthData();
                    window.location = "/"
                }
                setUsuario({
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    correo: data.correo,
                    municipio: data.municipio,
                    estado: data.estado,
                    password: data.password
                });
                fetch('https://apibuena.onrender.com/cita/all/' + authData.userId, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                       
                        if (response.ok) {
                            return response.json(); 
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(citasData => {
                        setContenidoCitas(citasData);
                        if (citasData && citasData.length > 0) {
                            const citasOrdenadas = citasData.sort((a, b) => new Date(b.FechaCita) - new Date(a.FechaCita));
                            setNotaMasReciente(citasOrdenadas[0].NotasCitas);
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener datos:', error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []);
    const handleCita = () => {
       
                window.location = "/CrearCita"
         
    };
    const handleInfo = () => {
       
        window.location = "/Perfil/Informacion"
 
};
    return (
        <>
            <main>
                <h1>¡Hola!, {usuario.nombre}</h1>
                <div className="proximasCitas">
                    <p>Proximas citas:</p>
                    <div className="contenedorProCit">
                        <div className={contenidoCitas ? "contenidoCitas" : "ocultarContenido"}>
                            <Citas citas={contenidoCitas} usuario={usuario} />
                            <p className={contenidoCitas.length!=0 ? "ocultarTexto" : "defaultTexto"}>
                                No tiene proximas citas.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="notasPsicologa">
                    <p>Notas de la psicóloga:</p>
                    <div className="contenedorNotas">
                        <div className={notaMasReciente ? "contenidoNotas" : "ocultarContenido"}>
                            {notaMasReciente ? <p  className="defaultTexto">{notaMasReciente}</p> : <p className="defaultTexto">No hay notas.</p>}
                        </div>
                    </div>
                </div>
                <div className="botonesNav">
                    <button type="button" title="Cerrar Sesión" onClick={() => {
                        window.location = "/"
                    }}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                    <button type="button" title="Abrir información personal" onClick={handleInfo}>
                        <FontAwesomeIcon icon={faCircleUser} />
                    </button>
                    <button type="button" title="Agendar Cita" onClick={handleCita}>
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </button>
                </div>
            </main>
        </>
    )
}