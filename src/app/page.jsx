import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';


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
        </main>
    )
}