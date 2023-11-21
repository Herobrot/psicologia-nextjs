"use client"

import "./Navbar.css"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSession } from "next-auth/react";

config.autoAddCss = false;

export default function Navbar(){
    const { data: session, status } = useSession();
    const [menu, setMenu] = useState(true);

    if(!session){
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
                            <p>{session.user.nombre} <br />{session.user.apellidos}</p>    
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