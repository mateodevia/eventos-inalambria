import React, { useState } from 'react';
import '../NavBar/NavBar.css';
import { withRouter } from 'react-router-dom';

function NavBar(props) {
    let [open, setOpen] = useState(false);

    let handleHome = () => {
        props.history.push('/');
        setOpen(false);
    };

    let handleReservas = () => {
        if (window.sessionStorage.usuario) {
            props.history.push('/reservas');
            setOpen(!open);
        } else {
            props.history.push('/login');
            setOpen(!open);
        }
    };

    let handleSession = () => {
        if (window.sessionStorage.usuario) {
            props.history.push('/login');
            sessionStorage.clear();
        } else {
            props.history.push('/login');
        }
    };
    return (
        <div className='navBarContainer flexbox'>
            <button onClick={() => setOpen(!open)}>☰</button>
            <h1 onClick={handleHome}>Portal de Eventos</h1>
            <div
                className='navTitlesContainer flexbox'
                onClick={handleReservas}
            >
                <h2
                    style={{
                        textDecoration:
                            props.selected === 'Reservas'
                                ? 'underline'
                                : 'none',
                    }}
                >
                    Reservas
                </h2>
            </div>
            <h3 className='session' onClick={handleSession}>
                {window.sessionStorage.usuario
                    ? 'Cerrar Sesión'
                    : 'Iniciar Sesión'}
            </h3>
            {open && (
                <div className='mobileContainer'>
                    <div
                        className='mobileNavTitlesContainer flexbox'
                        onClick={handleReservas}
                    >
                        <h2
                            style={{
                                textDecoration:
                                    props.selected === 'Reservas'
                                        ? 'underline'
                                        : 'none',
                            }}
                        >
                            Reservas
                        </h2>
                    </div>
                    <h3 className='mobileSession' onClick={handleSession}>
                        {window.sessionStorage.usuario
                            ? 'Cerrar Sesión'
                            : 'Iniciar Sesión'}
                    </h3>
                </div>
            )}
        </div>
    );
}

export default withRouter(NavBar);
