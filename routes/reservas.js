const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const controller = require('../controllers/reservas');

//Crea una nueva reserva en el sistema
router.post('/', jwt({ secret: process.env.SECRET }), (req, res) => {
    let evento = req.body.evento;
    let usuario = req.body.usuario;
    let cantidad = req.body.cantidad;
    if (evento && usuario && cantidad) {
        controller
            .postReserva(evento, usuario, cantidad)
            .then((evento) => res.status(200).json(evento))
            .catch((err) => {
                console.log(err);

                res.status(500).json(err);
            });
    } else {
        res.status(400).json({ error: 'Hacen falta parametros' });
    }
});

module.exports = router;
