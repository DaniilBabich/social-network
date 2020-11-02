import React from 'react';
import {Redirect} from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto/ProfilePhoto';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileTextarea from './ProfileTextarea/ProfileTextarea';
import ProfilePosts from './ProfilePosts/ProfilePosts';
import style from './Profile.module.css';
import preloader from '../../../images/preloader.gif';

const Profile = (props) => {
    if (!props.match.params.id && !props.isAuth) {
        return <Redirect to='/login'/>
    }

    if (!props.profile || props.isFetching) {
        return <img src={preloader} alt="preloader" className={style.preloader}/>
    }

    return (
        <div className={style.profile}>
            <div>
                <ProfilePhoto profile={props.profile}
                              paramsId={props.match.params.id}
                              changePhoto={props.changePhoto}
                />
            </div>
            <div>
                <ProfileInfo profile={props.profile}
                             status={props.status}
                             setStatus={props.setStatus}
                             updateStatus={props.updateStatus}
                             paramsId={props.match.params.id}
                             changeProfileInfo={props.changeProfileInfo}
                />
                <ProfileTextarea paramsId={props.match.params.id}
                                 postText={props.postText}
                                 updatePostText={props.updatePostText}
                                 addPost={props.addPost}
                />
                <ProfilePosts profile={props.profile}
                              posts={props.posts}
                />
            </div>
        </div>
    );
}

export default Profile;