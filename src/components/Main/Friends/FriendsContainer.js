import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {withoutAuthRedirect} from '../../../hoc/withoutAuthRedirect';
import {setUsers, follow, unfollow, getFriends, deleteFriend} from '../../../store/usersReducer';
import Users from '../Users/Users';

class FriendsContainer extends React.Component {
    componentDidMount() {
        this.props.getFriends();
    }

    componentWillUnmount() {
        this.props.setUsers(null);
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
        followingsInProgress: state.users.followingsInProgress
    }
}

export default compose(
    connect(mapStateToProps, {setUsers, getFriends, deleteFriend, follow, unfollow}),
    withRouter,
    withoutAuthRedirect
)(FriendsContainer)