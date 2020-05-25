import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ReservasList from './components/ReservasList/ReservasList';

function App() {
    return (
        <div>
            <Switch>
                <Route
                    path='/login'
                    render={() => {
                        return <Login />;
                    }}
                />
                <Route
                    exact
                    path='/'
                    render={() => {
                        return (
                            <React.Fragment>
                                <NavBar selected={'Home'} />
                                <Home />
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
                                <ReservasList />
                            </React.Fragment>
                        );
                    }}
                />
            </Switch>
        </div>
    );
}

export default withRouter(App);
