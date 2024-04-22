import { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

const socket = socketio('http://localhost:4000');

interface Message {
    title: string;
    name: string;
    price: number;
}

function App() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('newMessage', (data: Message) => {
            console.log('Received data:', data);

            setMessages(prev => [...prev, data]); 
        });
    }, []);

    return (
        <div>
            {messages.map((message: Message, index: number) => (
                <div key={index}>
                    <strong>Title:</strong> {message.title}
                    <strong>Name:</strong> {message.name}
                    <strong>Price:</strong> {message.price}
                </div>  
            ))}
        </div>
    );
}

export default App;