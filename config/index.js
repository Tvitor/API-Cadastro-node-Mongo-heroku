const express = require("express");
const bodyParser = require("body-parser");
const app = express()
if(process.env.PORT !== 'production'){
    require('dotenv').config()
  }

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res)=> res.send('hello'))
// require('../src/controllers/usercontroller')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{console.log(`Our app is running on port ${ PORT }`);});