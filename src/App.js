import React from 'react';
import {compose} from 'redux';
import {connect} from "react-redux";
import {initialization} from './store/initializationReducer';
import {login} from './store/authReducer';
import HeaderContainer from './components/Header/HeaderContainer';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.css';

class App extends React.Component {
    componentDidMount() {
        this.props.initialization()
    }

    render() {
        if (!this.props.isInitializationAccess) {
            return (
                <div className="appWrapper">

                </div>
            );
        }

        return (
            <div className="appWrapper">
                <HeaderContainer/>
                <Main {...this.props}/>
                <Footer/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isInitializationAccess: state.initialization.isInitializationAccess,
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default compose(
    connect(mapStateToProps, {initialization, login})
)(App)