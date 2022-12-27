const express = require('express');
const cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {

    const params = '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code=' + req.query.code;
    const response = await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return res.json(data);
});

app.listen(process.env.PORT);
