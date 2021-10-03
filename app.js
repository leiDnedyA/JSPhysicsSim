const express = require('express')
const app = express();
const serv = require('http').Server(app);
require('dotenv').config();

app.use(express.static('public'));

serv.listen(process.env.PORT || 3000);