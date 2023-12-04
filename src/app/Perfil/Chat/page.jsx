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
        const newSocket = new WebSocket('ws://localhost:8080');
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            setMessages(prev => [...prev, event.data]);
        };

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
                        <div key={index}>{message}</div>
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
