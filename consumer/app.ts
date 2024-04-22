import * as amqp from 'amqplib';
import fetch from 'isomorphic-fetch'; // Importamos isomorphic-fetch en lugar de node-fetch

async function connect() {
    try {
        const connection = await amqp.connect('amqp://52.21.220.174');
        const channel = await connection.createChannel();

        // Declaramos la cola desde la que vamos a consumir
        const queueName = 'cola_pedidos';
        await channel.assertQueue(queueName);

        console.log(`Esperando mensajes en la cola ${queueName}...`);

        // Consumimos los mensajes de la cola
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    const mensaje = JSON.parse(msg.content.toString());
                    console.log("Mensaje recibido:", mensaje);
                    await enviarMensaje('http://34.224.115.54:8000/payment/', mensaje);
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error al procesar el mensaje:", error);
                    channel.nack(msg);
                }
            }
        });
    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error);
    }
}

// Función para enviar un mensaje a una ruta específica
async function enviarMensaje(url: string, mensaje: string) {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({ mensaje });

    const options: { method: string, headers: any, body: string } = {
        method: 'POST',
        headers,
        body
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            console.log("Mensaje enviado correctamente.");
            connect();
        } else {
            throw new Error(`Error al enviar el mensaje: ${response.statusText}`);
        }
    } catch (error :any ) {
        throw new Error(`Error al enviar el mensaje: ${error.message}`);
    }
}

connect();
