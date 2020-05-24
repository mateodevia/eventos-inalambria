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
        props.history.push('/reservas');
        setOpen(!open);
    };

    let handleSession = () => {
        props.history.push('/login');
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
                Iniciar Session
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
                        Iniciar Session
                    </h3>
                </div>
            )}
        </div>
    );
}

export default withRouter(NavBar);
