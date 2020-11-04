import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Nav from './Nav/Nav'
import ProfileContainer from './Profile/ProfileContainer';
import DialogsContainer from './Dialogs/DialogsContainer';
import FriendsContainer from './Friends/FriendsContainer';
import UsersContainer from './Users/UsersContainer';
import LoginReduxForm from './LoginForm/LoginForm';
import style from './Main.module.css';

const Main = (props) => {
    return (
        <div className={style.main}>
            <Nav/>
            <Route path={'/profile/:id?'} render={() => <ProfileContainer/>}/>
            <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
            <Route path={'/friends'} render={() => <FriendsContainer/>}/>
            <Route path={'/users'} render={() => <UsersContainer/>}/>
            <Route path={'/login'} render={() => <LoginReduxForm
                onSubmit={(data) => {props.login(data.email, data.password, data.rememberMe, data.captcha)}}
                isAuth={props.isAuth}
                captchaUrl={props.captchaUrl}/>}
            />
            <Route exact path={'/'} render={() => <Redirect to='/profile'/>}/>
        </div>
    );
}

export default Main;