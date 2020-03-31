const express = require("express");
const bodyParser = require("body-parser");

if(process.env.PORT !== 'production'){
  require('dotenv').config()
}
const app = express()

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

 require('../src/controllers/usercontroller')(app);
 require('../src/controllers/authcontroller')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{console.log(`Our app is running on port ${ PORT }`);});