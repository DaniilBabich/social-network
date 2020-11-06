import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {withoutAuthRedirect} from '../../../hoc/withoutAuthRedirect';
import {setUsers, getUsers, follow, unfollow, setCurrentPortion} from '../../../store/usersReducer';
import Users from '../Users/Users';

class FriendsContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(1, this.props.portionUsersCount, true);
        window.addEventListener('scroll', this.addPortion);
    }

    componentWillUnmount() {
        this.props.setCurrentPortion(null);
        this.props.setUsers(null);
        window.removeEventListener('scroll', this.addPortion);
    }

    addPortion = () => {
        if (
            window.pageYOffset === document.documentElement.scrollHeight - document.documentElement.clientHeight
            &&
            this.props.currentPortion * this.props.portionUsersCount < this.props.totalUsersCount
        ) {
            this.props.setCurrentPortion(this.props.currentPortion);
            this.props.getUsers(this.props.currentPortion, this.props.portionUsersCount, true);
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
        totalUsersCount: state.users.totalUsersCount,
        currentPortion: state.users.currentPortion,
        portionUsersCount: state.users.portionUsersCount,
        isFetching: state.initialization.isFetching,
        followingsInProgress: state.users.followingsInProgress
    }
}

export default compose(
    connect(mapStateToProps, {setUsers, getUsers, follow, unfollow, setCurrentPortion}),
    withRouter,
    withoutAuthRedirect
)(FriendsContainer)