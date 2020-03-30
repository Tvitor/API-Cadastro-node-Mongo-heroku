const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controllers/usercontroller')(app);
require('./controllers/authcontroller')(app);

app.listen(PORT);