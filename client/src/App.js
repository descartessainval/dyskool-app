import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import UserState from './context/users/UserState';
import DefinitionState from './context/definitions/DefinitionState';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import Home from './components/pages/Home';
import Categorie from './components/pages/Categorie';
import Definitions from './components/pages/Definitions';

import Login from './components/pages/authentification/Login';
import Register from './components/pages/authentification/Register';

import Dashboard from './components/pages/admin/Dashboard';
import UserBoard from './components/pages/admin/dataSection/users/UserBoard';
import UserForm from './components/pages/admin/dataSection/users/UserForm';
import UserRoute from './components/routing/UserRoute';
import AdminRoute from './components/routing/AdminRoute';
import DefinitionBoard from './components/pages/admin/dataSection/dictionnary/DefinitionBoard';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <AuthState>
        <AlertState>
          <UserState>
            <DefinitionState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className='App'>
                    <Switch>
                      {/* FREE ACCESS */}
                      <Route exact path='/' component={Home} />
                      <Route path='/les_definitions' component={Definitions} />

                      {/* AUTHENTIFICATION */}
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/register' component={Register} />

                      {/* ACTIVITIES */}
                      {/* route admin*/}
                      <Route path='/super-admin' component={Dashboard} />
                      <Route path='/users' component={UserBoard} />
                      <Route path='/userForm' component={UserForm} />

                      {/* Routing */}
                      {/* route user */}
                      <Route exact path='/categories' component={Categorie} />
                      {/* route admin*/}
                      {/* <Route exact path='/super-admin' component={Dashboard} /> */}
                    </Switch>
                  </div>
                  <Footer />
                </Fragment>
              </Router>
            </DefinitionState>
          </UserState>
        </AlertState>
      </AuthState>
    );
  }
}
