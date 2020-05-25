import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login(props) {
    let [register, setRegister] = useState(false);
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');
    let [disabled, setDisabled] = useState(true);

    let usuarioRef = useRef();
    let contraseñaRef = useRef();
    let nombreRef = useRef();

    let handleChange = () => {
        setDisabled(
            usuarioRef.current?.value === '' ||
                contraseñaRef.current?.value === '' ||
                nombreRef.current?.value === ''
        );
    };

    let handleRegisterChange = () => {
        setRegister(!register);
        setError(false);
        setDisabled(true);
        usuarioRef.current.value = '';
        contraseñaRef.current.value = '';
    };

    let handleError = (msg) => {
        setErrorMessage(msg);
        setError(true);
        setTimeout(() => setError(false), 5000);
    };

    let handleSend = () => {
        if (!register) {
            axios
                .post('/api/usuarios/login', {
                    usuario: usuarioRef.current.value,
                    contraseña: contraseñaRef.current.value,
                })
                .then((response) => {
                    console.log(response.data);
                    window.sessionStorage.usuario =
                        response.data.usuario.USUARIO;
                    window.sessionStorage.id = response.data.usuario.ID;
                    window.sessionStorage.token = response.data.token;
                    props.history.push('/');
                })
                .catch((err) => handleError('Credenciales Invalidas'));
        } else {
            axios
                .post('/api/usuarios', {
                    usuario: usuarioRef.current.value,
                    contraseña: contraseñaRef.current.value,
                })
                .then((response) => {
                    console.log(response.data);
                    window.sessionStorage.usuario = response.data.usuario;
                    window.sessionStorage.id = response.data.id;
                    window.sessionStorage.token = response.data.token;
                    props.history.push('/');
                })
                .catch((err) => handleError('Ya existe ese usuario'));
        }
    };

    return (
        <div className='loginContainer flexbox'>
            <div className='loginCardContainer'>
                <h1>{register ? 'Crear Cuenta' : 'Iniciar Sesión'}</h1>
                {error && <div className='errorMessage'>{errorMessage}</div>}
                <input
                    placeholder='Usuario'
                    type='text'
                    ref={usuarioRef}
                    onChange={handleChange}
                />
                {register && (
                    <input
                        placeholder='Nombre Completo'
                        type='text'
                        ref={nombreRef}
                        onChange={handleChange}
                    />
                )}
                <input
                    placeholder='Contraseña'
                    type='password'
                    ref={contraseñaRef}
                    onChange={handleChange}
                />
                <h2 onClick={handleRegisterChange}>
                    {register
                        ? '¿Ya tienes Cuenta? Inicia Sesión'
                        : '¿No tienes Cuenta? Registrate'}
                </h2>
                <h2
                    className='skipTitle'
                    onClick={() => props.history.push('/')}
                >
                    Omitir
                </h2>
                <button onClick={handleSend} disabled={disabled}>
                    {register ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </div>
        </div>
    );
}

export default withRouter(Login);
