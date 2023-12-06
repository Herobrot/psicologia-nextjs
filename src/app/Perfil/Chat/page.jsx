"use client"
import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';

export default function Chat() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:3001');
    
        newSocket.onopen = () => console.log("Conexión WebSocket abierta");
        newSocket.onmessage = (event) => {
         
            if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = function() {
                    const text = reader.result;
                    setMessages(prev => [...prev, { text: text, type: 'received' }]);
                };
                reader.readAsText(event.data);
            }
        };
        
        newSocket.onerror = (event) => console.error("Error en WebSocket", event);
        newSocket.onclose = (event) => console.log("Conexión WebSocket cerrada", event);
    
        setSocket(newSocket);
    
        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        if (socket && inputMessage) {
            socket.send(inputMessage);
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
                    <Link href="/">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h2>Chat.</h2>
                </div>

                <div className="contenedorChat ">
    {messages.map((message, index) => (
        <div 
            className={`message ${message.type === 'sent' ? 'sent' : 'received'}`} 
            key={index}
        >
            {message.text}
        </div>
    ))}
    <span id="scroll" />
</div>


                <div className="pieChat">
                    <div className="contenedorInput">
                        <input 
                            type="text" 
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
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
