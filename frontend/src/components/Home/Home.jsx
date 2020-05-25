import React, { useState, useRef } from 'react';
import '../Home/Home.css';
import { withRouter } from 'react-router-dom';
import EventosList from './ListaEventos/EventosList';
import CreateEvent from './CreateEvent/CreateEvent';
import CreateReserva from './CreateReserva/CreateReserva';
import EditEvent from './EditEvent/EditEvent';

function Home(props) {
    let [createEvent, setCreateEvent] = useState(false);
    let [editEvent, setEditEvent] = useState(false);
    let [createReserva, setCreateReserva] = useState(false);
    let [refresh, setRefresh] = useState(false);
    let [currentEvent, setCurrentEvent] = useState(undefined);

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
    let handleCreateEventClose = (newEvent) => {
        if (newEvent) {
            setRefresh(!refresh);
        }
        document.body.style.overflow = '';
        setCreateEvent(false);
    };

    let handleEditEvent = (eventoId) => {
        setCurrentEvent(eventoId);
        if (window.sessionStorage.usuario) {
            document.body.style.overflow = 'hidden';
            setEditEvent(true);
        } else {
            props.history.push('/login');
        }
    };
    let handleEditEventClose = (newEvent) => {
        if (newEvent) {
            setRefresh(!refresh);
        }
        document.body.style.overflow = '';
        setEditEvent(false);
    };

    let handleCreateReserva = (eventoId) => {
        if (window.sessionStorage.usuario) {
            document.body.style.overflow = 'hidden';
            setCurrentEvent(eventoId);
            setCreateReserva(true);
        } else {
            props.history.push('/login');
        }
    };
    let handleCreateReservaClose = (newReserva) => {
        document.body.style.overflow = '';
        setCreateReserva(false);
        if (newReserva) {
            props.history.push('/reservas');
        }
    };

    return (
        <React.Fragment>
            <CreateEvent show={createEvent} close={handleCreateEventClose} />
            <CreateReserva
                show={createReserva}
                close={handleCreateReservaClose}
                event={currentEvent}
            />
            <EditEvent
                show={editEvent}
                close={handleEditEventClose}
                event={currentEvent}
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
                <EventosList
                    handleCreateReserva={handleCreateReserva}
                    handleEditEvent={handleEditEvent}
                    refresh={refresh}
                />
            </div>
        </React.Fragment>
    );
}

export default withRouter(Home);
