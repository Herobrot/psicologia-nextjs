import { faCalendarDay, faFileLines, faUsers, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


export default function Admin(){
    return(
        <>
            <main>
                <FontAwesomeIcon icon={faRightFromBracket} /> {/*Saltará una alerta que luego es la que
                                                                redigirá al inicio, cerrando sesión*/}
                <h1>Administración</h1>
                <div className="listaNav">
                    <div className="boton">
                        <FontAwesomeIcon icon={faUsers} />
                        <Link href={"/Administrador/Pacientes"}>
                            Pacientes
                        </Link>
                    </div>
                    <div className="boton">
                        <FontAwesomeIcon icon={faCalendarDay} />
                        <Link href={"/Administrador/Pendientes"}>
                            Citas por aprobar
                        </Link>
                    </div>
                    <div className="boton">
                        <FontAwesomeIcon icon={faFileLines} />
                        <Link href={"/Administrador/Historial"}>
                            Historial
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}