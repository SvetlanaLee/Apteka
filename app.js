require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT ?? 3000;
const cookieParser = require('cookie-parser'); // библиотека необходимая для чтения дынных с куки
const expressSession = require('express-session');
// const FileStore = require('session-file-store')(expressSession);
const registrRoute = require('./routes/registr');
// для сохранности сессий в наших данных
const sessionConfig = {
  name: 'coockie',
  // store: new FileStore(), // добавить после установки session-file-store
  secret: 'keyboard cat',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: true,
};

app.use(expressSession(sessionConfig));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/reg', registrRoute);

app.listen(PORT, (req, res) => {
  console.log('Подключен порт:', PORT);
});
