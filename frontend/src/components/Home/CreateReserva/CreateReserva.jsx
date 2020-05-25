import React from 'react';
import './CreateReserva.css';

const CreateReserva = (props) => {
    {
        if (props.show == true) {
            return (
                <div className='containerCreateReserva'>
                    <div className='cardCreateReserva' onClick={props.close}>
                        Reservas
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
};

export default CreateReserva;
