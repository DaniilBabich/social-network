import React, {useState} from 'react';
import style from './ProfileInfoStatus.module.css';

const ProfileInfoStatus = (props) => {
    let [isStatusEditMode, setStatusEditMode] = useState(false);

    return (
        isStatusEditMode
            ?
            <input className={style.statusInput}
                   type="text"
                   value={props.status}
                   autoFocus={true}
                   onChange={(event) => {
                       props.setStatus(event.target.value)
                   }}
                   onKeyDown={(event) => {
                       if (event.key === 'Enter') {
                           setStatusEditMode(false)
                           props.updateStatus(event.target.value)
                       }
                   }}
                   onBlur={(event) => {
                       setStatusEditMode(false)
                       props.updateStatus(event.target.value)
                   }}
            />
            :
            props.paramsId
                ?
                <div className={style.profileInfoStatus}>
                    {props.status}
                </div>
                :
                <div className={`${style.profileInfoStatus} ${style.myProfileInfoStatus}`} onClick={() => setStatusEditMode(true)}>
                    {props.status || 'edit status'}
                </div>
    );
}

export default ProfileInfoStatus;