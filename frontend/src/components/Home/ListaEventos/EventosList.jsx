import React, { useEffect, useState } from 'react';
import Evento from './Evento/Evento';
import '../ListaEventos/EventosList.css';
import axios from 'axios';

function EventosList(props) {
    let [events, setEvents] = useState([]);
    useEffect(() => {
        axios.get('/api/eventos').then((response) => {
            setEvents(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('/api/eventos').then((response) => {
            setEvents(response.data);
        });
    }, [props.refresh]);

    return (
        <div className='eventsContainer flexbox'>
            {events.map((event, i) => (
                <Evento
                    key={i}
                    event={event}
                    handleCreateReserva={props.handleCreateReserva}
                    handleEditEvent={props.handleEditEvent}
                />
            ))}
        </div>
    );
}

export default EventosList;
