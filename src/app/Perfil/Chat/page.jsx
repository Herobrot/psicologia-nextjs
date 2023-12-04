"use client"
import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Chat() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const newSocket = new WebSocket('wss://api-vvmz.onrender.com');
    
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
    
        return () => newSocket.close();
    }, []);
    
    const sendMessage = () => {
        if (socket && inputMessage) {
            socket.send(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <>
            <main>
                <div className="cabeceraChat">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <h2>Chat</h2>
                </div>

                <div className="contenedorChat">
                    {messages.map((message, index) => (
                        <div className='message' key={index}>{message}</div>
                    ))}
                </div>

                <div className="botonEnviar">
                    <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <FontAwesomeIcon 
                        icon={faPaperPlane} 
                        onClick={sendMessage} 
                    />
                </div>
            </main>
        </>
    );
}
