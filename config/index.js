const express = require("express");
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require('../src/controllers/usercontroller')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{console.log(`Our app is running on port ${ PORT }`);});