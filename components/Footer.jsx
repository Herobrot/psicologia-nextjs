
import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons"

export default function Footer(){
    return(
        <footer>
            <div className="contacto">
                <h1>Contacto:</h1>
                <div>
                    <div className="block-1">
                        <FontAwesomeIcon icon={faLocationDot} /><span>Calle Del Carmen #2004, Blasi Vega, Suchiapa, Oaxaca</span>
                    </div>
                    <div className="block-2">
                        <FontAwesomeIcon icon={faEnvelope} /><span>correo@gmail.com</span>
                        <FontAwesomeIcon icon={faPhone} /><span>971-192-7547 </span>
                    </div>                    
                </div>
            </div>
            <div className="iconos">
                <FontAwesomeIcon icon={faFacebookSquare} className="svg" />
                <FontAwesomeIcon icon={faInstagramSquare} className="svg" />
            </div>
        </footer>
    )
}