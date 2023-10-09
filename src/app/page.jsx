import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import "./inicio.css"

config.autoAddCss = false;

export default function Home(){
    return(
        <main>
            <div className="fondo">
                <div className="presentacion">
                    <h1>Psicología y pedagogía en línea</h1>
                    <p>
                        Servicios de psicologia y pedagogia para pacientes, agenta tu cita a como mejor se adapte a sus necesidades, desde casa, sin salir.
                    </p>
                    <div className="agendar">
                        <h3>Agendar una cita</h3>
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </div>
                </div>
            </div>
            <div className="ayuda">
                <div className="h1">
                    <h1>"Estamos aquí para ayudarte"</h1>
                </div>
                <p>
                    Si piensa que tiene un problema, o no se siente bien,
                    nosotros estamos para ayudarte. Queremos que todos puedan
                    gozar de bienestar. Muchas personas en todo el mundo suelen
                    tener miedo de ir al psicologo. Agende su cita, sin contratiempos
                    y sin necesidad de salir de casa, estamos para ayudarlo.
                </p>
            </div>
        </main>
    )
}