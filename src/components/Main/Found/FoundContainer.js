import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {setUsers, getFoundUsers, follow, unfollow, setCurrentPortion, setSearch, toggleIsSearching} from '../../../store/usersReducer';
import Users from '../Users/Users';

class FoundContainer extends React.Component {
    componentDidMount() {
        this.props.getFoundUsers(1, this.props.portionUsersCount, false, this.props.search);
        window.addEventListener('scroll', this.addPortion);
    }

    componentWillUnmount() {
        this.props.setSearch(null);
        this.props.setCurrentPortion(null);
        this.props.setUsers(null);
        window.removeEventListener('scroll', this.addPortion);
    }

    componentDidUpdate(prevProps) {
        if (this.props.search && this.props.search !== prevProps.search) {
            this.props.setUsers(null);
            this.props.getFoundUsers(1, this.props.portionUsersCount, false, this.props.search)
            this.props.setCurrentPortion(null);
        }
    }

    addPortion = () => {
        if (
            window.pageYOffset === document.documentElement.scrollHeight - document.documentElement.clientHeight
            &&
            this.props.currentPortion * this.props.portionUsersCount < this.props.totalUsersCount
        ) {
            this.props.setCurrentPortion(this.props.currentPortion);
            this.props.getFoundUsers(this.props.currentPortion, this.props.portionUsersCount, false, this.props.search);
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
        followingsInProgress: state.users.followingsInProgress,
        search: state.users.search
    }
}

export default compose(
    connect(mapStateToProps, {setUsers, getFoundUsers, follow, unfollow, setSearch, setCurrentPortion, toggleIsSearching}),
    withRouter
)(FoundContainer)