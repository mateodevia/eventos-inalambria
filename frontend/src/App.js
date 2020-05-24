import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';

function App() {
    return (
        <div>
            <Switch>
                <Route
                    path='/login'
                    render={() => {
                        return <div>Login</div>;
                    }}
                />
                <Route
                    exact
                    path='/'
                    render={() => {
                        return (
                            <React.Fragment>
                                <NavBar selected={'Home'} />
                                <div>Home</div>
                            </React.Fragment>
                        );
                    }}
                />
                <Route
                    exact
                    path='/reservas'
                    render={() => {
                        return (
                            <React.Fragment>
                                <NavBar selected={'Reservas'} />
                                <div>Mis Reservas</div>
                            </React.Fragment>
                        );
                    }}
                />
            </Switch>
        </div>
    );
}

export default withRouter(App);
