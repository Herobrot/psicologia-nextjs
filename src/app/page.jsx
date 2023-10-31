import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import "./inicio.css"
import { Card_B } from '../../components/Cards';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

config.autoAddCss = false;

export default function Home(){
    return(
        <>
            <Navbar />
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
                <Card_B title='"Estamos aquí para ayudarte"'
                    text="Si piensa que tiene un problema, o no se siente bien,
                        nosotros estamos para ayudarte. Queremos que todos puedan
                        gozar de bienestar. Muchas personas en todo el mundo suelen
                        tener miedo de ir al psicologo. Agende su cita, sin contratiempos
                        y sin necesidad de salir de casa, estamos para ayudarlo." />
                <div className="comoAgendar">
                    <h2>Como agendar una cita:</h2><br />
                    <ol>
                        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li><br />
                        <li>Dolor voluptas sint nam delectus officia consectetur!</li><br />
                        <li>Perferendis iusto possimus veniam, laudantium repellendus quas sed</li><br />
                        <li>commodi, eos delectus enim asperiores quasi maxime!</li><br />
                        <li>Morbi volutpat, arcu vel gravida pharetra, turpis lacus.</li><br />
                    </ol>
                </div>            
            </main>
            <Footer />
        </>
    )
}