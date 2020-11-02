import React from 'react';
import style from './DialogsMessages.module.css';

const DialogsMessages = () => {
    return (
        <div className={style.dialogsMessages}>
            <div className={style.message}>
                <div className={style.name}>
                    Name:
                </div>
                <div className={style.text}>
                    Message
                </div>
            </div>
            <div className={style.message}>
                <div className={style.name}>
                    Name:
                </div>
                <div className={style.text}>
                    Message
                </div>
            </div>

            <textarea/>
        </div>
    );
}

export default DialogsMessages;