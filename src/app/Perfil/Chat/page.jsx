import "./Chat.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"
export default function Chat(){
    return(
        <>
            <main>
                <div className="cabeceraChat">
                    <Link href="/Perfil">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Chat.</h2>
                </div>

                <div className="contenedorChat">

                </div>

                <div className="pieChat">
                    <input type="text" name="" id="" />
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </main>
        </>
    )
}