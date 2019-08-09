import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Router, Switch} from 'react-router';
import {getHistory} from './service/history';
import {PrivateRoute} from './component/PrivateRoute';
import WelcomePage from './page/WelcomePage';
import IdeasPage from './page/IdeasPage';
import Footer from './component/Footer';
import {LoginPage} from './page/LoginPage';

class App extends React.Component {

    render() {
        return (
            <Router history={getHistory()}>
                <Switch>
                    <Route exact={true} path='/' component={WelcomePage}/>
                    <PrivateRoute path='/ideas' component={IdeasPage}/>
                    <Route path='/login' component={LoginPage}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;