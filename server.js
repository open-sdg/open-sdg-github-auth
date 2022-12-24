var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = 'd057ffc62f01ce8f3376';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {

    const params = '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code=' + req.query.code;

    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
});

app.get('/getUserData', async function (req, res) {
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
});

app.listen(process.env.PORT);
