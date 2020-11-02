import React from 'react';
import style from './Dialogs.module.css';
import DialogsUsers from './DialogsUsers/DialogsUsers';
import DialogsMessages from './DialogsMessages/DialogsMessages';

const Dialogs = () => {
    return (
        <div className={style.dialogs}>
            <DialogsUsers/>
            <DialogsMessages/>
        </div>
    );
}

export default Dialogs;
