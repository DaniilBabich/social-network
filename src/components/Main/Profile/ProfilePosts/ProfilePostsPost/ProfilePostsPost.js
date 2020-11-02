import React from 'react';
import style from './ProfilePostsPost.module.css';
import defaultUserPhoto from '../../../../../images/defaultUserPhoto.png';

const ProfilePostsPost = (props) => {
    return (
        <div className={style.profilePostsPost}>
            <div className={style.user}>
                <img src={props.profile.photos.small || defaultUserPhoto} alt="userPhoto"/>
                <div>{props.profile.fullName}</div>
            </div>
            <div className={style.text}>{props.post.text}</div>
        </div>
    );
};

export default ProfilePostsPost;