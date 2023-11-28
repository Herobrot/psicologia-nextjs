"use client"

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
                        <div className="agendar" onClick={() => window.location="/Registro"}>
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
                        <li>1. Seleccione el boton de menú en la parte superior.</li><br />
                        <li>2. Seleccione la opcion "Registrarse" para continuar.</li><br />
                        <li>3. Ingrese los datos que se le piden, no deje nada vacío.</li><br />
                        <li>4. ¡Listo! Ya tiene una cuenta con la que agendar una cita.</li><br />
                        <li>5. Puede agendar una cita cuando usted quiera con una cuenta.</li><br />
                    </ol>
                </div>            
            </main>
            <Footer />
        </>
    )
}