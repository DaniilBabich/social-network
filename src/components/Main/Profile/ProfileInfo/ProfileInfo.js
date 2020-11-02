import React, {useState} from 'react';
import ProfileInfoStatus from './ProfileInfoStatus/ProfileInfoStatus';
import ProfileInfoForm from "./ProfileInfoForm/ProfileInfoForm";
import style from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    let [isProfileInfoEditMode, setProfileInfoEditMode] = useState(false);

    return (
        isProfileInfoEditMode
            ?
            <ProfileInfoForm onSubmit={(data) => props.changeProfileInfo(data)}
                             initialValues={props.profile}
                             profile={props.profile}
                             status={props.status}
                             setStatus={props.setStatus}
                             updateStatus={props.updateStatus}
                             paramsId={props.paramsId}
            />
            :
            <div className={style.profileInfo}>
                {
                    props.paramsId
                        ?
                        <div className={style.profileName}>
                            {props.profile.fullName}
                        </div>
                        :
                        <div className={`${style.profileName} ${style.myProfileName}`}>
                            {props.profile.fullName}
                            <div className={style.profileEditButton} onClick={() => setProfileInfoEditMode(true)}>
                                edit info
                            </div>
                        </div>
                }
                <ProfileInfoStatus status={props.status}
                                   setStatus={props.setStatus}
                                   updateStatus={props.updateStatus}
                                   paramsId={props.paramsId}
                />
                <div className={style.infoHeader}>
                    Info:
                </div>
                <div className={style.infoItem}>
                    <div className={style.itemHeader}>
                        About me:
                    </div>
                    <div className={style.itemText}>
                        {props.profile.aboutMe}
                    </div>
                </div>
                <div className={style.infoItem}>
                    <div className={style.itemHeader}>
                        Skills:
                    </div>
                    <div className={style.itemText}>
                        {props.profile.lookingForAJobDescription}
                    </div>
                </div>
                <div className={style.infoItem}>
                    <div className={style.itemHeader}>
                        Looking for a job:
                    </div>
                    <div className={style.itemText}>
                        {props.profile.lookingForAJob ? 'Yes' : 'No'}
                    </div>
                </div>
                <div className={style.infoHeader}>
                    Contact:
                </div>
                {
                    Object.keys(props.profile.contacts).map((contact) => {
                        return (
                            <div className={style.infoItem} key={contact}>
                                <div className={style.itemHeader}>
                                    {contact}:
                                </div>
                                <div className={style.itemText}>
                                    {props.profile.contacts[contact]}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    );
}

export default ProfileInfo;