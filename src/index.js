const express = require("express");
const bodyParser = require("body-parser");
require('dotenv-safe').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controllers/usercontroller')(app);
require('./controllers/authcontroller')(app);

app.listen(3000);