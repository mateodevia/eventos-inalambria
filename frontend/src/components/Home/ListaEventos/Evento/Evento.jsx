import React, { useEffect, useState } from 'react';
import './Evento.css';
import editIcon from '../../edit.svg';

function EventosList(props) {
    let formatDate = (date) => {
        let response = date.substring(0, 10);
        return response;
    };

    return (
        <React.Fragment>
            <div className='cardContainer'>
                {props.event.USUARIO === window.sessionStorage.usuario && (
                    <div
                        className='editButton'
                        onClick={() => props.handleEditEvent(props.event)}
                    >
                        <img src={editIcon} alt='editIcon' />
                    </div>
                )}
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
