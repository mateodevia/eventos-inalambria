import React, { useEffect, useState } from 'react';
import './Evento.css';

function EventosList(props) {
    return (
        <React.Fragment>
            <div className='cardContainer'>
                <div className='imageContainer'>
                    <img
                        src='https://techdator.net/wp-content/uploads/2020/03/Apple-WWDC-2020-min.jpg'
                        alt=''
                    />
                </div>
                <h2>{props.event.NOMBRE}</h2>
                <h3>{props.event.FECHA}</h3>
                <h3>${props.event.PRECIO}</h3>
                <h3>Organizado por:</h3>
                <h4>{props.event.USUARIO}</h4>
                <button onClick={props.handleCreateReserva}>RESERVAR</button>
            </div>
        </React.Fragment>
    );
}

export default EventosList;
