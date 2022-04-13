/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable quotes */
require('dotenv').config();
require('./config/passport-google');

const dbConnectionCheck = require("./db/dbConnectionCheck");
const express = require('express');
const passport = require('passport');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const cookieParser = require("cookie-parser"); // библиотека необходимая для чтения дынных с куки
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);
const indexRoute = require("./routes/index");
const registrRoute = require("./routes/users/registr");

// const sequelize = require('sequelize');
let https;
try {
  https = require('https');
} catch (err) {
  console.log('https support is disabled!');
}
const app = express();
const PORT = process.env.PORT ?? 3000;


// для сохранности сессий в наших данных
const sessionConfig = {
  name: "coockie",
  store: new FileStore(), // добавить после установки session-file-store

  secret: "keyboard cat",
  secret: 'secret',
  
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: true,
};

require("./routes/users/passport")(passport);

app.use(expressSession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use("/", indexRoute);
app.use("/", registrRoute);


dbConnectionCheck();

// https
//   .createServer(
//     // Provide the private and public key to the server by reading each
//     // file's content with the readFileSync() method.
//     {
//       key: fs.readFileSync('key.pem'),
//       cert: fs.readFileSync('cert.pem'),
//     },
//     app,
//   ).listen(PORT, (req, res) => {
//     console.log('Сервер стартовал по протоколу HTTPS, порт:', PORT);
//   });

app.listen(PORT, (req, res) => {

  console.log("Подключен порт:", PORT);

  console.log('Сервер стартовал по протоколу HTTP, порт:', PORT);
});
