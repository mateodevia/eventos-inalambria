import React, { useState, useRef } from 'react';
import './CreateReserva.css';
import closeIcon from './close.svg';

const CreateReserva = (props) => {
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    let inputRef = useRef();

    let handleReservar = () => {
        if (
            inputRef.current.value === '' ||
            inputRef.current.value < 0 ||
            parseInt(inputRef.current.value) <= 0
        ) {
            handleError('La cantidad de boletas no es valida');
        } else {
            fetch('/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.sessionStorage.token,
                },
                body: JSON.stringify({
                    evento: props.event.ID,
                    usuario: window.sessionStorage.id,
                    cantidad: inputRef.current.value,
                }),
            })
                .then(async (response) => {
                    let data = await response.json();
                    if (data.detail === 'No hay suficientes Cupos') {
                        handleError('No hay suficientes Cupos');
                    } else if (data.detail) {
                        handleError('Hubo un error. Intentalo más tarde.');
                    } else {
                        props.close(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    let handleError = (msg) => {
        setErrorMessage(msg);
        setError(true);
        setTimeout(() => setError(false), 4000);
    };

    if (props.show == true) {
        return (
            <div className='containerCreateReserva'>
                <div className='cardCreateReserva'>
                    <div
                        className='closeButton'
                        onClick={() => props.close(false)}
                    >
                        <img src={closeIcon} alt='closeIcon' />
                    </div>
                    <h1>Crear Reserva</h1>
                    {error && (
                        <div className='errorMessage'>{errorMessage}</div>
                    )}
                    <h2>Evento:</h2>
                    <label>{props.event.NOMBRE}</label>
                    <br />
                    <br />
                    <h2>Descripción:</h2>
                    <p>{props.event.DESCRIPCION}</p>
                    <br />
                    <h3>¿Cuantas boletas desea reservar?</h3>
                    <input type='number' maxLength='50' ref={inputRef} />
                    <br />
                    <button onClick={handleReservar}>RESERVAR</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default CreateReserva;
