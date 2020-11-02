import React from 'react';
import UsersUser from './UsersUser/UsersUser';
import style from './Users.module.css';
import preloader from '../../../images/preloader.gif';

const Users = (props) => {
    let users = props.users.map((user) => <UsersUser
        user={user}
        followingsInProgress={props.followingsInProgress}
        follow={props.follow}
        unfollow={props.unfollow}
        key={user.id}
    />);

    return (
        <div className={style.users}>
            {users}
            {props.isFetching ? <img src={preloader} alt="preloader" className={style.preloader}/> : null}
        </div>
    );
}

export default Users;