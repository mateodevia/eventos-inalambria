const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios');
const controllerReservas = require('../controllers/reservas');

router.get('/:id/reservas', (req, res) => {
    let usuario = req.params.id;
    controllerReservas
        .getReservasByUser(usuario)
        .then((eventos) => res.status(200).json(eventos))
        .catch((err) => res.status(500).json(err));
});

router.post('/usuarios', (req, res) => {
    let usuario = req.body.usuario;
    let contraseña = req.body.contraseña;
    let nombre = req.body.nombre;
    controller
        .postUsuario(usuario, contraseña, nombre)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
});

router.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let contraseña = req.body.contraseña;
    controller
        .getUsuario(usuario, contraseña)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
