import React, { useState, useRef } from 'react';
import '../Home/Home.css';
import { withRouter } from 'react-router-dom';
import EventosList from './ListaEventos/EventosList';
import CreateEvent from './CreateEvent/CreateEvent';
import CreateReserva from './CreateReserva/CreateReserva';

function Home(props) {
    let [createEvent, setCreateEvent] = useState(false);
    let [createReserva, setCreateReserva] = useState(false);

    let eventosRef = useRef();

    let handleExplorar = () => {
        window.scroll({
            left: 0,
            top: eventosRef.current.offsetTop - 60,
            behavior: 'smooth',
        });
    };

    let handleCreateEvent = () => {
        if (window.sessionStorage.usuario) {
            document.body.style.overflow = 'hidden';
            setCreateEvent(true);
        } else {
            props.history.push('/login');
        }
    };
    let handleCreateEventClose = () => {
        document.body.style.overflow = '';
        setCreateEvent(false);
    };

    let handleCreateReserva = () => {
        if (window.sessionStorage.usuario) {
            document.body.style.overflow = 'hidden';
            setCreateReserva(true);
        } else {
            props.history.push('/login');
        }
    };

    let handleCreateReservaClose = () => {
        document.body.style.overflow = '';
        setCreateReserva(false);
    };

    return (
        <React.Fragment>
            <CreateEvent show={createEvent} close={handleCreateEventClose} />
            <CreateReserva
                show={createReserva}
                close={handleCreateReservaClose}
            />
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
                    <button
                        className='addEventButton'
                        onClick={handleCreateEvent}
                    >
                        Agregar Evento
                    </button>
                    <h1>Eventos</h1>
                </div>
                <EventosList handleCreateReserva={handleCreateReserva} />
            </div>
        </React.Fragment>
    );
}

export default withRouter(Home);
