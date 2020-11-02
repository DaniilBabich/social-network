import React from 'react';
import style from './DialogsUsers.module.css';
import defaultUserPhoto from '../../../../images/defaultUserPhoto.png';

const DialogsUsers = () => {
    return (
        <div className={style.dialogsUsers}>
            <div className={`${style.user} ${style.newMessageUser}`}>
                <img src={defaultUserPhoto} alt="userPhoto"/>
                <div>
                    Name Surname
                </div>
            </div>
            <div className={`${style.user} ${style.activeUser}`}>
                <img src={defaultUserPhoto} alt="userPhoto"/>
                <div>
                    Name Surname
                </div>
            </div>
        </div>
    );
}

export default DialogsUsers;