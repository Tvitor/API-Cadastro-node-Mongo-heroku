const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('../src/controllers/usercontroller')(app);

app.listen(PORT, () =>{console.log(`Our app is running on port ${ PORT }`);});