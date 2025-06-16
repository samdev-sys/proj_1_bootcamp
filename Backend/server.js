const express = require('express');
const cors =require('cors');
const db=require('./db');
const bodyParser = require('body-parser');
const app= express();
const PORT =3307;


app.use (cors());
app.use(bodyParser.json());

app.use(express.static('public'));


app.post('/')
