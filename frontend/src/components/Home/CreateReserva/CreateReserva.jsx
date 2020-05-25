import React, { useState } from 'react';
import './CreateReserva.css';
import closeIcon from './close.svg';

const CreateReserva = (props) => {
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');
    if (props.show == true) {
        return (
            <div className='containerCreateReserva'>
                <div className='cardCreateReserva'>
                    <div className='closeButton' onClick={props.close}>
                        <img src={closeIcon} alt='closeIcon' />
                    </div>
                    <h1>Crear Reserva</h1>
                    {error && (
                        <div className='errorMessage'>{errorMessage}</div>
                    )}
                    <h2>Evento</h2>
                    <label>{props.event.NOMBRE}</label>
                    <br />
                    <h3>¿Cuantas boletas desea reservar?</h3>
                    <input type='number' maxLength='50' />
                    <br />
                    <button>RESERVAR</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default CreateReserva;
