"use client"
import React, { useState, useEffect, Suspense } from 'react';
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import Mensajes from './components/Mensajes';
import { getAuthData } from '../../../../Token';

export default function Chat() {
    const authData = getAuthData();
    const [socket, setSocket] = useState(null);
    const [socketActivado, setSocketBool] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {

        const newSocket = new WebSocket(process.env.NEXT_PUBLIC_APIRUL_WEB2);
    
        newSocket.onopen = () => {
            console.log("Conexión WebSocket abierta")
            const connectionMessage = { type: 'connection', clientId: authData.userId };
            newSocket.send(JSON.stringify(connectionMessage));};
            newSocket.onmessage = (event) => {
                try {
                  
                    const data = JSON.parse(event.data);
                    console.log('Mensaje parseado como JSON:', data);
            
                    setMessages(prev => [...prev, { text: data.text, type: 'received' }]);
                } catch (error) {
                   
                    console.log('Mensaje como texto plano:', event.data);
                    setMessages(prev => [...prev, { text: event.data, type: 'received' }]);
                }
            };
            
        
        newSocket.onerror = (event) => console.error("Error en WebSocket", event);
        newSocket.onclose = (event) => console.log("Conexión WebSocket cerrada", event);
    
        setSocket(newSocket);
        setSocketBool(true);
        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        if (socket && inputMessage) {
            const messageToSend = {
                type: 'message',
                text: inputMessage,
                clientId: authData.token 
            };
    
            socket.send(JSON.stringify(messageToSend));
            setMessages(prev => [...prev, { text: inputMessage, type: 'sent' }]);
            setInputMessage('');
        }
        const scroll = document.getElementById('scroll');

        const scrollTimeout = setTimeout(function() {
            scroll.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 200);
    };

    return (
        <>
            <main>
                <div className="cabeceraChat">
                    <Link href="/Perfil">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Chat.</h2>
                </div>

                <div className="contenedorChat">
                    <Suspense fallback={<div id='cargando'><FontAwesomeIcon icon={faSpinner} /></div>}>
                        <Mensajes data={messages} />
                    </Suspense>
                <span id="scroll" />
                </div>

                <div className="pieChat">
                    <div className="contenedorInput">
                        <input 
                            type="text" 
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Escribe un número..."
                            disabled={!socketActivado}
                        />
                        <span>
                            <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} />
                        </span>
                    </div>
                </div>
            </main>
        </>
    );
}
