const express = require("express");
const bodyParser = require("body-parser");
require('dotenv-safe').config();
const PORT = process.env.PORT || 3000;

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.get('/', (req, res) => {
    res.status(200).json({ message:" Welcome to Node.js & Express" });
  });
require('./controllers/usercontroller')(app);
require('./controllers/authcontroller')(app);

app.listen(PORT);