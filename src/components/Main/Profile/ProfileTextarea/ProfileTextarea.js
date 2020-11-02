import React from 'react';
import style from './ProfileTextarea.module.css';

const ProfileTextarea = (props) => {
    if (props.paramsId) {
        return null
    }

    return (
        <div className={style.profileTextarea}>
            <textarea value={props.postText} onChange={(event) => {props.updatePostText(event.target.value)}}/>
            <button onClick={() => {if (props.postText) props.addPost()}}>Add Post</button>
        </div>
    );
}

export default ProfileTextarea;