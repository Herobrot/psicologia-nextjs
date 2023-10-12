import "./Navbar.css"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


config.autoAddCss = false;

export default function Navbar(){

    return(
        <header>
            <nav>
                <div className="logoContenedor">
                    <Link href={"/"}>
                        <img src="/oo.png" alt="" />
                        <h4>Psicopedagogía</h4>
                    </Link>
                </div>
                <input type="checkbox" id="check" />
                <label for="check">
                    <FontAwesomeIcon icon={faBars} className="btn-bars" />
                </label>
                <ul className="nav-lista">
                    <li><img src="/oo.png" alt="" /></li>
                    <li>
                        <p>Cuenta anónima<br />Para continuar, inicie sesión.</p>    
                    </li>
                    <li>
                        <input type="checkbox" id="check" />
                        <label for="check_2">
                            <Link href={"/Login"}>Iniciar sesión</Link>
                        </label>
                    </li>
                    <li>
                        <p>O bien, cree una nueva cuenta</p>
                    </li>
                    <li>
                        <input type="checkbox" id="check" />
                        <label for="check_2">
                            <Link href={""}>Registrarse</Link>
                        </label>
                    </li>
                </ul>
            </nav>
        </header>
    )
}