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
import {LogoutComponent} from './component/LogoutComponent';
import NavigationBar from './component/NavigationBar';

type AppState = {
    userLoggedIn: boolean
}

class App extends React.Component<any, AppState> {


    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            userLoggedIn: false
        };
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn(state: boolean): void {
        this.setState({userLoggedIn: state});
    }

    render() {
        return (
            <Router history={getHistory()}>
                <NavigationBar userLoggedId={this.state.userLoggedIn}/>
                <Switch>
                    <Route exact={true} path='/' component={WelcomePage}/>
                    <PrivateRoute path='/ideas' component={IdeasPage}/>
                    <Route path='/login' component={() => <LoginPage setLoggedInState={this.handleLogIn}/>}/>
                    <PrivateRoute path='/logout'
                                  component={() => <LogoutComponent setLoggedInState={this.handleLogIn}/>}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;