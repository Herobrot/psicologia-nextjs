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
                    <img src="/oo.png" alt="" />
                    <h4>Psicopedagogía</h4>
                </div>
                <input type="checkbox" id="check" />
                <label for="check">
                    <FontAwesomeIcon icon={faBars} className="btn-bars" />
                </label>
                <ul className="nav-lista">
                    <li><Link href={"#"}>Home</Link></li>
                </ul>
            </nav>
        </header>
    )
}