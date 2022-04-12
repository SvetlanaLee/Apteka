require('dotenv').config();
const express = require('express');
const passport = require('passport');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT ?? 3000;

const cookieParser = require('cookie-parser'); // библиотека необходимая для чтения дынных с куки
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const indexRoute = require('./routes/index');
const registrRoute = require('./routes/users/registr');

// для сохранности сессий в наших данных
const sessionConfig = {
  name: 'coockie',
  store: new FileStore(), // добавить после установки session-file-store
  secret: 'keyboard cat',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // устанавливаем сколько живет кука
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: true,
};

require('./routes/users/passport')(passport);

app.use(expressSession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/', indexRoute);
app.use('/', registrRoute);

app.listen(PORT, (req, res) => {
  console.log('Подключен порт:', PORT);
});
