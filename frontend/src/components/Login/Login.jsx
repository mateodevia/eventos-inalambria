import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login(props) {
    let [register, setRegister] = useState(false);

    let usuarioRef = useRef();
    let contraseñaRef = useRef();

    let handleChange = () => {
        setRegister(!register);
    };

    let handleSend = () => {};

    return (
        <div className='loginContainer flexbox'>
            <div className='loginCardContainer'>
                <h1>{register ? 'Crear Cuenta' : 'Iniciar Sesión'}</h1>
                <input placeholder='Usuario' type='text' ref={usuarioRef} />
                <input
                    placeholder='Contraseña'
                    type='text'
                    ref={contraseñaRef}
                />
                <h2 onClick={handleChange}>
                    {register
                        ? '¿Ya tienes Cuenta? Inicia Sesión'
                        : '¿No tienes Cuenta? Registrate'}
                </h2>
                <button onClick={handleSend}>
                    {register ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </div>
        </div>
    );
}

export default withRouter(Login);
