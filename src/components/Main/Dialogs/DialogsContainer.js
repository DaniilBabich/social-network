import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withoutAuthRedirect} from '../../../hoc/withoutAuthRedirect';
import Dialogs from './Dialogs';

class DialogsContainer extends React.Component {
    render() {
        return (
            <Dialogs {...this.props}/>
        );
    }
}

export default compose(
    connect(),
    withoutAuthRedirect
)(DialogsContainer)