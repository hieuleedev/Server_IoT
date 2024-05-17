const express = require('express');
const mqttRoute = require('./routes/mqtt');
const app = express();

app.use('/mqtt', mqttRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log('server is running in port 3000'));
