import React, { useRef, useState } from 'react';
import './CreateEvent.css';
import closeIcon from './close.svg';

const CreateEvent = (props) => {
    let [selectedFile, setSelectedFile] = useState(
        'Ningún archivo seleccionado'
    );

    let fileRef = useRef();

    let handleFileSelected = () => {
        setSelectedFile(fileRef.current.files[0].name);
    };

    if (props.show) {
        return (
            <div className='containerCreateEvent'>
                <div className='cardCreateEvent'>
                    <div className='closeButton' onClick={props.close}>
                        <img src={closeIcon} alt='closeIcon' />
                    </div>
                    <h1>Crear Evento</h1>
                    <input
                        className='nombreInput'
                        placeholder='Nombre del evento'
                        type='text'
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
                    <input className='fechaInput' placeholder='' type='date' />
                    <input
                        className='horaInput'
                        placeholder=''
                        type='time'
                        accept='image/*'
                    />
                    <br />
                    <input
                        className='cuposInput'
                        placeholder='Cupos Disponibles'
                        type='number'
                    />
                    $
                    <input
                        className='precioInput'
                        placeholder='Precio por Boleta'
                        type='number'
                    />
                    COP
                    <br />
                    <textarea
                        className='descripcionTextArea'
                        placeholder='Descripción'
                        rows='5'
                        cols='50'
                    />
                    <br />
                    <button>Agregar</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default CreateEvent;
