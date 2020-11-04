import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './UsersUser.module.css';
import defaultUserPhoto from '../../../../images/defaultUserPhoto.png';

const UsersUser = (props) => {
    return (
        <div className={style.usersUser}>
            <NavLink to={`/profile/${props.user.id}`}>
                <img src={props.user.photos.small || defaultUserPhoto} alt="userPhoto"/>
            </NavLink>
            <div>
                <NavLink to={`/profile/${props.user.id}`} className={style.name}>
                    {props.user.name}
                </NavLink>
            </div>
            {
                props.user.followed
                    ?
                    <button className={style.unfollow}
                            disabled={props.followingsInProgress.some((id) => {
                                return id === props.user.id
                            })}
                            onClick={() => {
                                props.unfollow(props.user.id);
                                if (props.matchPath === "/friends") {
                                    props.deleteFriend(props.user)
                                }
                            }}>
                        Unfollow
                    </button>
                    :
                    <button className={style.follow}
                            disabled={props.followingsInProgress.some((id) => {
                                return id === props.user.id
                            })}
                            onClick={() => {
                                props.follow(props.user.id)
                            }}>
                        Follow
                    </button>
            }
        </div>
    );
};

export default UsersUser;