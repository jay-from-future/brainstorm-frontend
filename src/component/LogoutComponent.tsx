import React from 'react';
import {AccessTokenService} from '../service/AccessTokenService';
import {getHistory} from '../service/history';

type LogoutComponentProps = {
    setLoggedInState: { (state: boolean): void }
}

export class LogoutComponent extends React.Component<LogoutComponentProps> {

    componentDidMount(): void {
        AccessTokenService.removeAccessToken();
        this.props.setLoggedInState(false);
        const history = getHistory();
        history.push('/');
    }

    render() {
        return (<div><h3>Logging out...</h3></div>);
    }

}