import express from "express";
import bodyParser from "body-parser";
require('dotenv-safe').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controllers/authcontroller')(app);
require('./controllers/projectcontroller')(app);

app.listen(3000);