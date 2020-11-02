import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export let withoutAuthRedirect = (Component) => {
    let RedirectComponent = (props) => {
        return (
            props.isAuth
                ? <Component {...props}/>
                : <Redirect to='login'/>
        );
    }

    let mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth
    });

    return connect(mapStateToProps)(RedirectComponent);
}