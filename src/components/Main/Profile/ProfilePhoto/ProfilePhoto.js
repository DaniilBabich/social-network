import React from 'react';
import style from './ProfilePhoto.module.css';
import defaultUserPhoto from '../../../../images/defaultUserPhoto.png';

const ProfilePhoto = (props) => {
    return (
        <div className={style.profilePhoto}>
            <img src={props.profile.photos.large || defaultUserPhoto} alt="userPhoto"/>
            {
                !props.paramsId
                    ?
                    <label htmlFor="changePhoto">
                        <input type="file"
                               id="changePhoto"
                               accept=".jpg, .jpeg, .png"
                               onChange={(event) => {
                                   props.changePhoto(event.target.files[0])
                               }}/>
                        Change photo
                    </label>
                    :
                    null
            }
        </div>
    );
}

export default ProfilePhoto;