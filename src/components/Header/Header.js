import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css';
import logo from '../../images/logo.png';

const Header = (props) => {
    return (
        <div className={style.header}>
            <div className={style.contentWrapper}>
                <NavLink to="/profile" className={style.logoWrapper}>
                    <img src={logo} alt="logo" className={style.logo}/>
                </NavLink>
                {
                    props.isAuth
                        ?
                        <div className={style.nameLogout}>
                            <div className={style.name}>{props.login}</div>
                            <div onClick={props.logout} className={style.logout}>Logout</div>
                        </div>
                        :
                        <div>
                            <NavLink to="/login" className={style.login}>Login</NavLink>
                        </div>
                }
            </div>
        </div>
    );
}

export default Header;