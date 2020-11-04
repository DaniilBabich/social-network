import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {setUsers, follow, unfollow, getFoundUsers, updateSearch} from '../../../store/usersReducer';
import Users from '../Users/Users';

class FoundContainer extends React.Component {
    componentDidMount() {
        if (this.props.search) this.props.getFoundUsers(this.props.search);
    }

    componentWillUnmount() {
        this.props.setUsers(null);
    }

    componentDidUpdate(prevProps) {
        if (this.props.search && this.props.search !== prevProps.search) {
            this.props.setUsers(null);
            this.props.getFoundUsers(this.props.search);
        }
    }

    render() {
        return (
            <Users {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        isFetching: state.initialization.isFetching,
        followingsInProgress: state.users.followingsInProgress,
        search: state.users.search
    }
}

export default compose(
    connect(mapStateToProps, {setUsers, getFoundUsers, follow, unfollow, updateSearch}),
    withRouter
)(FoundContainer)