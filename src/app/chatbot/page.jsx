"use client"
import React, { useState, useEffect } from 'react';
import "./Chatbot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Mensajes from './components/Mensajes';

export default function Chatbot() {
    const [socketActivado, setSocketBool] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const newSocket = new WebSocket(process.env.NEXT_PUBLIC_APIRUL_WEB);
    
        newSocket.onopen = () => console.log("Conexión WebSocket abierta");
        newSocket.onmessage = (event) => {
            if (typeof event.data === 'string') {
                const newMessages = event.data.split(/[\n]+/).filter(msg => msg.trim() !== '');
                setMessages(prev => [...prev, ...newMessages]);
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
            socket.send(inputMessage);
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
                    <a href="/">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                    <h2>Chat.</h2>
                </div>

                <div className="contenedorChat">
                    <Mensajes data={messages} />
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
