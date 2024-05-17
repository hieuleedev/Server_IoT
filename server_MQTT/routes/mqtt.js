// mqttRoute.js
const express = require('express');
const mqtt = require('mqtt');

const router = express.Router();
const mqttBrokerUrl = 'mqtt://localhost';
const mqttClient = mqtt.connect(mqttBrokerUrl);

// Middleware
router.use(express.json());

// Route for publishing message to MQTT topic
router.get('/user', (req, res) => {
    res.send('Hello World1');
});
router.post('/publish', (req, res) => {
    const { topic, message } = req.body;

    mqttClient.publish("mess", message, (err) => {
        if (err) {
            console.error('Error publishing message:', err);
            res.status(500).json({ error: 'Failed to publish message' });
        } else {
            console.log('Message published successfully:', message);
            res.json({ message: 'Message published successfully' });
        }
    });
});

module.exports = router;
