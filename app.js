const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const eventosRouter = require('./routes/eventos');
const usuariosRouter = require('./routes/usuarios');
const reservasRouter = require('./routes/reservas');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use('/api/eventos', eventosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/usuarios', usuariosRouter);

// Intercepta los errores de autenticación
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(403).send({ message: 'Unauthorized' });
        return;
    }
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
