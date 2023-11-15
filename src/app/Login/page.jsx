import "./Login.css"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Login(){
    return(
        <>
            <main>
                <a href="/" title="Inicio">
                    <FontAwesomeIcon title="Inicio" icon={faArrowRightFromBracket} id="icono"
                    className="fa-flip-horizontal" />
                </a>
                <h1>Iniciar sesión</h1>
                <p>Para continuar, debes iniciar sesion o crear una cuenta.</p>
                <div>
                    <input type="text" id="input" placeholder="Teléfono/Correo" />
                    <input type="password" id="input" placeholder="Contraseña" />
                    <br />
                    <a href="/" id="btn-IS">Iniciar sesión</a>
                    <br />
                    <p>¿Olvido su contraseña?</p>
                    <a href="" className="btn">Recuperar cuenta</a>
                    <p>¿Aun no tiene una cuenta?</p>
                    <a href="/Registro" className="btn">Crear cuenta</a>
                </div>
            </main>
        </>
    )
}