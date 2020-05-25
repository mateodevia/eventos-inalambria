import React, { useRef, useState } from 'react';
import './EditEvent.css';
import closeIcon from './close.svg';
import axios from 'axios';

const EditEvent = (props) => {
    let [selectedFile, setSelectedFile] = useState(
        'Ningún archivo seleccionado'
    );
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    let nombreRef = useRef();
    let fileRef = useRef();
    let fechaRef = useRef();
    let cuposRef = useRef();
    let precioRef = useRef();
    let descripcionRef = useRef();

    let handleSumbit = () => {
        if (
            nombreRef.current.value === '' ||
            fechaRef.current.value === '' ||
            cuposRef.current.value === '' ||
            precioRef.current.value === '' ||
            descripcionRef.current.value === ''
        ) {
            handleError('Algunos Campos estás incompletos');
        } else {
            let payload = {
                id: props.event.ID,
                nombre: nombreRef.current.value,
                organizador: props.event.ORGANIZADOR,
                fecha: fechaRef.current.value,
                cupos: cuposRef.current.value,
                descripcion: descripcionRef.current.value,
                precio: precioRef.current.value,
                imagen: props.event.IMAGEN,
            };
            axios
                .put('/api/eventos', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + window.sessionStorage.token,
                    },
                })
                .then((res) => {
                    props.close(true);
                })
                .catch((err) =>
                    handleError('Hubo un error. Intentalo más tarde')
                );
        }
    };

    let handleError = (msg) => {
        setErrorMessage(msg);
        setError(true);
        setTimeout(() => setError(false), 4000);
    };

    let formatDate = (longDate) => {
        let response = longDate.substring(0, 10);
        let dates = response.split('-');
        response = dates[0];
        for (let i = 1; i < 3; i++) {
            let newDate = '';
            if (dates[i].length == 1) {
                newDate = '-' + '0' + dates[i];
            } else {
                newDate = '-' + dates[i];
            }
            response += newDate;
        }
        return response;
    };

    if (props.show) {
        return (
            <div className='containerEditEvent'>
                <div className='cardEditEvent'>
                    <div
                        className='closeButton'
                        onClick={() => props.close(false)}
                    >
                        <img src={closeIcon} alt='closeIcon' />
                    </div>
                    <h1>Editar Evento</h1>
                    {error && (
                        <div className='errorMessage'>{errorMessage}</div>
                    )}
                    <input
                        className='nombreInput'
                        placeholder='Nombre del evento'
                        type='text'
                        ref={nombreRef}
                        maxLength='50'
                        defaultValue={props.event.NOMBRE}
                    />
                    <br />
                    <label className='dateLabel'>Fecha: </label>
                    <input
                        className='fechaInput'
                        placeholder=''
                        type='date'
                        ref={fechaRef}
                        defaultValue={formatDate(props.event.FECHA)}
                    />
                    <br />
                    <input
                        className='cuposInput'
                        placeholder='Cupos Disponibles'
                        type='number'
                        ref={cuposRef}
                        maxLength='20'
                        defaultValue={props.event.CUPOS}
                    />
                    $
                    <input
                        className='precioInput'
                        placeholder='Precio por Boleta'
                        type='number'
                        ref={precioRef}
                        maxLength='20'
                        defaultValue={props.event.PRECIO}
                    />
                    COP
                    <br />
                    <textarea
                        className='descripcionTextArea'
                        placeholder='Descripción'
                        rows='5'
                        ref={descripcionRef}
                        maxLength='1000'
                        defaultValue={props.event.DESCRIPCION}
                    />
                    <br />
                    <button onClick={handleSumbit}>GUARDAR</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default EditEvent;
