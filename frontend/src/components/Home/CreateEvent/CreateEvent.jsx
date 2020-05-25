import React, { useRef, useState } from 'react';
import './CreateEvent.css';
import closeIcon from './close.svg';
import axios from 'axios';

const CreateEvent = (props) => {
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

    let handleFileSelected = () => {
        setSelectedFile(fileRef.current.files[0].name);
    };

    let handleSumbit = () => {
        if (
            nombreRef.current.value === '' ||
            !fileRef.current.files[0] ||
            fechaRef.current.value === '' ||
            cuposRef.current.value === '' ||
            parseInt(cuposRef.current.value) <= 0 ||
            precioRef.current.value === '' ||
            parseInt(precioRef.current.value) < 0 ||
            descripcionRef.current.value === ''
        ) {
            handleError('Algunos Campos estás incompletos o son invalidos');
        } else {
            const fd = new FormData();
            fd.append('nombre', nombreRef.current.value);
            fd.append('organizador', window.sessionStorage.id);
            fd.append('fecha', fechaRef.current.value);
            fd.append('cupos', cuposRef.current.value);
            fd.append('descripcion', descripcionRef.current.value);
            fd.append('precio', precioRef.current.value);
            fd.append('imagen', fileRef.current.files[0]);
            axios
                .post('/api/eventos', fd, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
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

    if (props.show) {
        return (
            <div className='containerCreateEvent'>
                <div className='cardCreateEvent'>
                    <div
                        className='closeButton'
                        onClick={() => props.close(false)}
                    >
                        <img src={closeIcon} alt='closeIcon' />
                    </div>
                    <h1>Crear Evento</h1>
                    {error && (
                        <div className='errorMessage'>{errorMessage}</div>
                    )}
                    <input
                        className='nombreInput'
                        placeholder='Nombre del evento'
                        type='text'
                        ref={nombreRef}
                        maxLength='50'
                    />
                    <br />
                    <input
                        className='imageInput'
                        type='file'
                        id='file'
                        onChange={handleFileSelected}
                        ref={fileRef}
                    />
                    <label htmlFor='file'>Subir Imagen</label>
                    <label className='fileName'>{selectedFile}</label>
                    <br />
                    <label className='dateLabel'>Fecha: </label>
                    <input
                        className='fechaInput'
                        placeholder=''
                        type='date'
                        ref={fechaRef}
                    />
                    <br />
                    <input
                        className='cuposInput'
                        placeholder='Cupos Disponibles'
                        type='number'
                        ref={cuposRef}
                        maxLength='20'
                    />
                    $
                    <input
                        className='precioInput'
                        placeholder='Precio por Boleta'
                        type='number'
                        ref={precioRef}
                        maxLength='20'
                    />
                    COP
                    <br />
                    <textarea
                        className='descripcionTextArea'
                        placeholder='Descripción'
                        rows='5'
                        ref={descripcionRef}
                        maxLength='1000'
                    />
                    <br />
                    <button onClick={handleSumbit}>AGREGAR</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default CreateEvent;
