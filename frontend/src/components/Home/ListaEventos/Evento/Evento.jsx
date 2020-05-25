import React, { useEffect, useState } from 'react';
import './Evento.css';

function EventosList(props) {
    let formatDate = (date) => {
        let response = date.replace(':00.000Z', '');
        response = response.replace('T', ' ');
        return response;
    };

    return (
        <React.Fragment>
            <div className='cardContainer'>
                <div className='imageContainer'>
                    <img src={props.event.IMAGEN} alt='' />
                </div>
                <h2>{props.event.NOMBRE}</h2>
                <h3>{formatDate(props.event.FECHA)}</h3>
                <h3>${props.event.PRECIO}</h3>
                <h3>Organizado por:</h3>
                <h4>{props.event.USUARIO}</h4>
                <button onClick={() => props.handleCreateReserva(props.event)}>
                    RESERVAR
                </button>
            </div>
        </React.Fragment>
    );
}

export default EventosList;
