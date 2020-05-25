import React, { useEffect, useState } from 'react';
import '../ReservasList/ReservasList.css';
import axios from 'axios';
import Reserva from './Reserva/Reserva';

function ReservasList(props) {
    let [reservas, setReservas] = useState([]);
    let [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(true);
        axios
            .get(`/api/usuarios/${window.sessionStorage.id}/reservas`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.sessionStorage.token,
                },
            })
            .then((response) => {
                setReservas(response.data);
                setCargando(false);
            });
    }, []);

    return (
        <React.Fragment>
            <div className='stickyReservasTitle'>
                <h1>Mis Reservas</h1>
            </div>
            <div className='reservasContainer flexbox'>
                {!cargando && reservas.length === 0 && (
                    <h1>Aún no tienes reservas</h1>
                )}
                {cargando && <h1>Cargando...</h1>}
                {reservas.map((reserva, i) => (
                    <Reserva reserva={reserva} key={i} />
                ))}
            </div>
        </React.Fragment>
    );
}

export default ReservasList;
