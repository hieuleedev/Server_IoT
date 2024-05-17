const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Xử lý tin nhắn nhận được từ ESP8266
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 5800;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
