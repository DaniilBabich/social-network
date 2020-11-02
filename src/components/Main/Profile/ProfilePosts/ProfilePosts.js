import React from 'react';
import ProfilePostsPost from './ProfilePostsPost/ProfilePostsPost';
import style from './ProfilePosts.module.css';

const ProfilePosts = (props) => {
    let posts = props.posts.map((post) => <ProfilePostsPost post={post} profile={props.profile}/>);

    return (
        <div className={style.profilePosts}>
            {posts}
        </div>
    );
}

export default ProfilePosts;