import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {logout} from '../../store/authReducer';
import Header from './Header';

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {logout})
)(HeaderContainer)