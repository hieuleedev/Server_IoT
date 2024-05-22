const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);

let latestData = null;
app.use(cors());

// Thiết lập WebSocket server
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    res.send('Socket.IO and HTTP server are running');
});

app.get('/tem', (req, res) => {
    if (latestData) {
        res.json(latestData);
    } else {
        res.status(404).json({ error: 'No data available' });
    }
});

const recipients = [
    'letrunghieu1@thaco.com.vn',
    'hoangngocthanh@thaco.com.vn',
    'nguyenminhtan@thaco.com.vn',
    'dangvantri@thaco.com.vn',
    'nguyenthanhquoc@thaco.com.vn',

].join(',');

const transporter = nodemailer.createTransport({
    host: 'mail.thaco.com.vn',
    port: 587, // Bạn có thể dùng các dịch vụ khác như 'yahoo', 'hotmail', v.v.
    auth: {
      user: 'rd-cntt@thaco.com.vn', // Email của bạn
      pass: 'It@2023!', // Mật khẩu email của bạn
    },
  });
  
  // Endpoint để gửi email
  app.post('/send-email', (req, res) => {
   const dataJson =  JSON.stringify(latestData);
   const data = JSON.parse(dataJson);
   console.log("data",data)
    const mailOptions = {
      from: 'rd-cntt@thaco.com.vn', // Địa chỉ email của bạn
      to: 'letrunghieu1@thaco.com.vn',
      subject: "Dữ liệu nhiệt độ Server",
      text: `Nhiệt độ server đã vượt mức ngưỡng an toàn ${data.temperature} °C `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });

  function checkAndSendEmail() {
    const dataJson =  JSON.stringify(latestData);
   const data = JSON.parse(dataJson);
   console.log("data",data)
    if (data && data.temperature > 25) {
        
        console.log("data",data)
         const mailOptions = {
           from: 'rd-cntt@thaco.com.vn', // Địa chỉ email của bạn
           to: recipients,
           subject: "Dữ liệu nhiệt độ Server",
           text: `Nhiệt độ server đã vượt mức ngưỡng an toàn ${data.temperature} °C `,
         };
       
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
  }


  

wss.on('connection', (ws) => {
    console.log('ESP8266 connected');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`Received message from client: ${message}`);
            latestData = data;
           if(data.temperature >25 ){
            checkAndSendEmail();
           }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Thực hiện các hành động xử lý lỗi tại đây (ví dụ: gửi phản hồi lỗi cho client)
        }
    });

    ws.on('close', () => {
        console.log('ESP8266 disconnected');
    });
});



const PORT = process.env.PORT || 5800;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
