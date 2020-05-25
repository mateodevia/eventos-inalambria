import React, { useState, useRef } from 'react';
import '../Home/Home.css';
import { withRouter } from 'react-router-dom';
import EventosList from './ListaEventos/EventosList';

function Home(props) {
    let eventosRef = useRef();

    let handleExplorar = () => {
        window.scroll({
            left: 0,
            top: eventosRef.current.offsetTop - 60,
            behavior: 'smooth',
        });
    };

    return (
        <React.Fragment>
            <div className='mainSection'>
                <div className='triangle'></div>
                <div className='welcomeContainer'>
                    <h1>¡Bienvenido!</h1>
                    <p>
                        En esto portal podrás descubrir muchos eventos para
                        asistír. Tendras la posibilidad de reservar tus entradas
                        e incluso de organizar tus propios eventos.
                    </p>
                    <button onClick={handleExplorar}>EXPLORAR EVENTOS</button>
                </div>
            </div>
            <div className='eventsSection' ref={eventosRef}>
                <div className='stickyTitle'>
                    <button className='addEventButton'>Agregar Evento</button>
                    <h1>Eventos</h1>
                </div>
                <EventosList />
            </div>
        </React.Fragment>
    );
}

export default withRouter(Home);
