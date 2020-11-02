import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {
    setProfile, getStatus, updateStatus, addPost, updatePostText, getProfile, changePhoto, setStatus, changeProfileInfo
} from '../../../store/profileReducer';
import Profile from './Profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        if (!id) id = this.props.id;
        this.props.getProfile(id);
        this.props.getStatus(id);
    }

    componentWillUnmount() {
        this.props.setProfile(null);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let id = this.props.match.params.id;
            if (!id) id = this.props.id;
            this.props.getProfile(id);
            this.props.getStatus(id);
        }
    }

    render() {
        return (
            <Profile {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        postText: state.profile.postText,
        posts: state.profile.posts,
        id: state.auth.id,
        isFetching: state.initialization.isFetching,
        isAuth: state.auth.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {
        setProfile, getStatus, updateStatus, updatePostText, addPost, getProfile, setStatus, changePhoto, changeProfileInfo
    }),
    withRouter
)(ProfileContainer)