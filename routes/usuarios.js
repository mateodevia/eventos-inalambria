const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const controller = require('../controllers/usuarios');
const controllerReservas = require('../controllers/reservas');

//Devuelve una lista con las reservas hechas por el usuario
router.get('/:id/reservas', jwt({ secret: process.env.SECRET }), (req, res) => {
    let usuario = req.params.id;
    controllerReservas
        .getReservasByUser(usuario)
        .then((eventos) => res.status(200).json(eventos))
        .catch((err) => res.status(500).json(err));
});

// Crea un nuevo usuario en el sistema
router.post('/', (req, res) => {
    let usuario = req.body.usuario;
    let contraseña = req.body.contraseña;
    let nombre = req.body.nombre;
    controller
        .postUsuario(usuario, contraseña, nombre)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
});

// Verifica las credenciales de un usuario y devuelve un token si son correctas
router.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let contraseña = req.body.contraseña;
    controller
        .getUsuario(usuario, contraseña)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
