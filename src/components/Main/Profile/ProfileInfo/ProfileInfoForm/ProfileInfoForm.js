import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../../../common/FormElements/FormElements';
import {required} from '../../../../../utils/validators';
import ProfileInfoStatus from '../ProfileInfoStatus/ProfileInfoStatus';
import style from './ProfileInfoForm.module.css';

const ProfileInfoForm = (props) => {
    return (
        <form className={style.profileInfoForm} onSubmit={props.handleSubmit}>
            <div className={style.forMovingButtonRight}>
                <Field component={Input}
                       name='fullName'
                       validate={[required]}
                       inputclass={'nameInput'}
                       wrapperclass={'longWrapper'}
                />
                <button className={style.profileSaveButton}>
                    Save
                </button>
            </div>
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
                <Field component={Input}
                       name='aboutMe'
                       validate={[required]}
                       inputclass={'defaultInput'}
                       wrapperclass={'longWrapper'}
                />
            </div>
            <div className={style.infoItem}>
                <div className={style.itemHeader}>
                    Skills:
                </div>
                <Field component={Input}
                       name='lookingForAJobDescription'
                       validate={[required]}
                       inputclass={'defaultInput'}
                       wrapperclass={'longWrapper'}
                />
            </div>
            <label className={style.infoItemLabel}>
                <div className={style.itemHeader}>
                    Looking for a job:
                </div>
                <Field component='input' type='checkbox' name='lookingForAJob'/>
            </label>
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
                            <Field component={Input}
                                   name={`contacts.${contact}`}
                                   inputclass={'defaultInput'}
                                   wrapperclass={'longWrapper'}
                            />
                        </div>
                    )
                })
            }
            {
                props.error
                    ?
                    props.error.map((error) => {
                        return (
                            <div className={style.profileInfoError} key={error}>{error}</div>
                        )
                    })
                    :
                    null
            }
        </form>
    );
}

let ProfileInfoReduxForm = reduxForm({form: 'profileInfoForm'})(ProfileInfoForm);

export default ProfileInfoReduxForm;