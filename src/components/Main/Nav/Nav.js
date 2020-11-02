import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Nav.module.css';

const Nav = () => {
    return (
        <div className={style.nav}>
            <NavLink to="/profile">
                Profile
            </NavLink>
            <NavLink to="/dialogs">
                Dialogs
            </NavLink>
            <NavLink to="/friends">
                Friends
            </NavLink>
            <NavLink to="/users">
                Users
            </NavLink>
        </div>
    );
}

export default Nav;