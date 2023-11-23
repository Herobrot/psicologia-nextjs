"use client"

import "./Navbar.css"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect,useState } from "react";
import { saveAuthData, getAuthData, clearAuthData } from "../Token"

config.autoAddCss = false;

export default function Navbar(){
    const authData = getAuthData();
    const [getUser,setUser]=useState(false);
    const [menu, setMenu] = useState(true);
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        correo: "",
        municipio: "",
        estado: "",
        password: ""
    });
    if(authData.userId){
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
                        setUser(false);
                        window.location = "/"
                    }
                    setUser(true);
                    setUsuario({
                        nombre: data.nombre,
                        apellidos: data.apellidos,
                        telefono: data.telefono,
                        correo: data.correo,
                        municipio: data.municipio,
                        estado: data.estado,
                        password: data.password
                    });
                })
                .catch(error => {
                    console.error('Error al obtener datos:', error);
                });
        }, []);
    }
   
    if(!getUser){
        return(
            <header>
                <nav>
                    <div className="logoContenedor">
                        <a href={"/"} onClick={() => {
                            if(!menu){
                                setMenu(!menu)
                            }
                        }}>
                            <img src="/oo.png" alt="" />
                            <h4>Psicopedagogía</h4>
                        </a>                                    
                        <FontAwesomeIcon icon={faBars} className={menu ? "btn-bars" : "btn-bars-active"} onClick={() => {
                            setMenu(!menu);
                    }} />
                    </div>
                    <ul className={menu ? "nav-lista" : "menu-open"} >
                        <li><img src="/oo.png" alt="" onClick={() => {
                            window.location="/"
                        }} /></li>
                        <li>
                            <p>Cuenta anónima<br />Para continuar, inicie sesión.</p>    
                        </li>
                        <li>                        
                            <a href={"/Login"} className="menu" onClick={() => {
                                if(!menu){
                                    setMenu(!menu)
                                }
                        }} >Iniciar sesión</a>
                        </li>
                        <li>
                            <p>O bien, cree una nueva cuenta</p>
                        </li>
                        <li>                        
                            <a href={"/Registro"} className="menu" onClick={() => {
                                if(!menu){
                                    setMenu(!menu)
                                }
                        }} >Registrarse</a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
    else{
        return(
            <header>
                <nav>
                    <div className="logoContenedor">
                        <a href={"/"} onClick={() => {
                            if(!menu){
                                setMenu(!menu)
                            }
                        }}>
                            <img src="/oo.png" alt="" />
                            <h4>Psicopedagogía</h4>
                        </a>                                    
                        <FontAwesomeIcon icon={faBars} className={menu ? "btn-bars" : "btn-bars-active"} onClick={() => {
                            setMenu(!menu);
                    }} />
                    </div>
                    <ul className={menu ? "nav-lista" : "menu-open"} >
                        <li><img src="/oo.png" alt="" onClick={() => {
                            window.location="/"
                        }} /></li>
                        <li>
                            <p>{usuario.nombre} <br />{usuario.apellidos}</p>    
                        </li>
                        <li>                        
                            <a href={"/Perfil"} className="menu" onClick={() => {
                                if(!menu){
                                    setMenu(!menu)
                                }
                        }} >Ver perfil</a>
                        </li>
                        <li>                        
                            <a href={"/Registro"} className="menu" onClick={() => {
                                if(!menu){
                                    setMenu(!menu)
                                }
                        }} >Cerrar sesión</a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}