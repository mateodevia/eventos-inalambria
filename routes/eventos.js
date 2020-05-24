const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventos');

router.get('/', (req, res) => {
    controller
        .getEventos()
        .then((eventos) => res.status(200).json(eventos))
        .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
    let nombre = req.body.nombre;
    let organizador = req.body.organizador;
    let fecha = req.body.fecha;
    let cupos = req.body.cupos;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    if (nombre && organizador && fecha && cupos && descripcion && precio) {
        controller
            .postEvento(nombre, organizador, fecha, cupos, descripcion, precio)
            .then((evento) => res.status(200).json(evento))
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(400).json({ error: 'Hacen falta parametros' });
    }
});

router.put('/', (req, res) => {
    let id = req.body.id;
    let nombre = req.body.nombre;
    let organizador = req.body.organizador;
    let fecha = req.body.fecha;
    let cupos = req.body.cupos;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    if (nombre && organizador && fecha && cupos && descripcion && precio) {
        controller
            .updateEvento(
                id,
                nombre,
                organizador,
                fecha,
                cupos,
                descripcion,
                precio
            )
            .then((evento) => res.status(200).json(evento))
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(400).json({ error: 'Hacen falta parametros' });
    }
});

module.exports = router;
