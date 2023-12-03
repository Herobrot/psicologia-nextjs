import "./Chat.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
export default function Chat(){
    return(
        <>
            <main>
                <div className="cabeceraChat">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <h2>Chat.</h2>
                </div>

                <div className="contenedorChat">

                </div>

                <div className="botonEnviar">
                    <input type="text" name="" id="" />
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </main>
        </>
    )
}