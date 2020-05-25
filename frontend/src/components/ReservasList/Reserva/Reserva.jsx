import React from 'react';
import '../Reserva/Reserva.css';

function Reserva(props) {
    return (
        <div className='reservasCardContainer flexbox'>
            <div className='imageContainer'>
                <img src={props.reserva.IMAGEN} alt='Imagen del Evento' />
            </div>
            <div className='infoContainer'>
                <h1>{props.reserva.NOMBRE}</h1>
                <h2>Boletas Reservadas:</h2>
                <label>{props.reserva.CANTIDAD}</label>
                <br />
                <h2>Fecha:</h2>
                <label>{props.reserva.FECHA}</label>
                <br />
                <h2>Descripción del evento:</h2>
                <br />
                <p className='descripcion'>{props.reserva.DESCRIPCION}</p>
            </div>
        </div>
    );
}

export default Reserva;
