"use client"

import "./Navbar.css"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect,useState } from "react";
import { saveAuthData, getAuthData, clearAuthData } from "../Token"

config.autoAddCss = false;

export default function Navbar() {
    const authData = getAuthData();
    const [getUser, setUser] = useState(false);
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
  
    useEffect(() => {
      if (authData.userId) {
        fetch(`https://apibuena.onrender.com/paciente/${authData.userId}`, {
          headers: {
            Authorization: `${authData.token}`,
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              clearAuthData();
              setUser(false);
              window.location = "/";
            } else {
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
            }
          })
          .catch(error => {
            console.error("Error al obtener datos:", error);
          });
      }
    }, [authData.userId]);
  
    const handleMenuClick = () => {
      setMenu(!menu);
    };
  
    const handleLogout = () => {
      clearAuthData();
      setMenu(!menu);
    };
  
    return (
      <header>
        <nav>
          <div className="logoContenedor">
            <a href="/" onClick={handleMenuClick}>
              <img src="/oo.png" alt="" />
              <h4>Psicopedagogía</h4>
            </a>
            <FontAwesomeIcon
              icon={faBars}
              className={menu ? "btn-bars" : "btn-bars-active"}
              onClick={handleMenuClick}
            />
          </div>
          <ul className={menu ? "nav-lista" : "menu-open"}>
            <li>
              <img src="/oo.png" alt="" onClick={() => {window.location="/"}} />
            </li>
            {!getUser ? (
              <>
                <li>
                  <p>Cuenta anónima<br />Para continuar, inicie sesión.</p>
                </li>
                <li>
                  <a
                    href="/Login"
                    className="menu"
                    onClick={handleMenuClick}
                  >
                    Iniciar sesión
                  </a>
                </li>
                <li>
                  <p>O bien, cree una nueva cuenta</p>
                </li>
                <li>
                  <a
                    href="/Registro"
                    className="menu"
                    onClick={handleMenuClick}
                  >
                    Registrarse
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <p className="user">
                    {usuario.nombre} <br />{usuario.apellidos}
                  </p>
                </li>
                <li>
                  <a
                    href="/Perfil"
                    className="menu"
                    onClick={handleMenuClick}
                  >
                    Ver perfil
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="menu"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    );
  }