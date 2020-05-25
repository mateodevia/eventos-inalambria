const express = require('express');
const jwt = require('express-jwt');
const fileUpload = require('express-fileupload');
const router = express.Router();
const controller = require('../controllers/eventos');

router.use(
    fileUpload({
        useTempFiles: true,
    })
);

//Devuelve la lista de eventos disponibles en la plataforma
router.get('/', (req, res) => {
    controller
        .getEventos()
        .then((eventos) => res.status(200).json(eventos))
        .catch((err) => res.status(500).json(err));
});

//Crea un nuevo evento en la plataforma
router.post('/', jwt({ secret: process.env.SECRET }), (req, res) => {
    let nombre = req.body.nombre;
    let organizador = req.body.organizador;
    let fecha = req.body.fecha;
    let cupos = req.body.cupos;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let imagen = req.files.imagen;
    if (
        nombre &&
        organizador &&
        fecha &&
        cupos &&
        descripcion &&
        precio &&
        imagen
    ) {
        controller.postEvento(
            nombre,
            organizador,
            fecha,
            cupos,
            descripcion,
            precio,
            imagen,
            (evento) => res.status(200).json(evento),
            (err) => res.status(500).json(err)
        );
    } else {
        res.status(400).json({ error: 'Hacen falta parametros' });
    }
});

// Actuzaliza el evento dado segun los parametros recibidos
router.put('/', jwt({ secret: process.env.SECRET }), (req, res) => {
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
