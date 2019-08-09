import React from 'react';
import {NavLink} from 'react-router-dom';
import {AccessTokenService} from '../service/AccessTokenService';

type MenuItemProps = {
    title: string,
    href: string
}

type NavigationBarProps = {
    userLoggedId: boolean
}

type NavigationBarState = {
    pages: Array<MenuItemProps>;
}

class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {

    constructor(props: any) {
        super(props);

        this.state = {
            pages: [
                {
                    title: 'Welcome',
                    href: '/'
                },
                {
                    title: 'Ideas',
                    href: '/ideas'
                },
                {
                    title: 'Log in',
                    href: '/login'
                },
                {
                    title: 'Log out',
                    href: '/logout'
                }
            ]
        };
    }

    render() {
        let {pages} = this.state;
        const {userLoggedId} = this.props;
        if (userLoggedId) {
            pages = pages.filter(p => !p.href.startsWith('/login'));
        } else {
            pages = pages.filter(p => !p.href.startsWith('/logout'));
        }
        let menuItems = pages
            .map(p => {
                return (
                    <li key={p.href} className='nav-item'>
                        <NavLink exact={true} to={p.href} className='nav-link inactive'
                                 activeClassName='nav-link active' title={p.title}>{p.title}</NavLink>
                    </li>
                );
            });

        return (
            <div className='container'>
                <ul className='nav nav-pills nav-fill'>
                    {menuItems}
                </ul>
            </div>
        );
    }
}

export default NavigationBar;