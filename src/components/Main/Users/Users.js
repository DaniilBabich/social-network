import React from 'react';
import {Redirect} from 'react-router-dom';
import UsersUser from './UsersUser/UsersUser';
import style from './Users.module.css';
import preloader from '../../../images/preloader.gif';

const Users = (props) => {
    let users = props.users.map((user) => <UsersUser
        user={user}
        followingsInProgress={props.followingsInProgress}
        follow={props.follow}
        unfollow={props.unfollow}
        deleteFriend={props.deleteFriend}
        matchPath={props.match.path}
        key={user.id}
    />);

    if (props.search && props.match.path !== '/found') {
        return <Redirect to='/found'/>
    }

    return (
        <div className={style.users}>
            {
                props.match.path === '/friends'
                    ?
                    null
                    :
                    <div className={style.searchWrapper}>
                        Find users:
                        <input className={style.searchInput}
                               type="text"
                               onKeyDown={(event) => {
                                   if (event.key === 'Enter' && event.target.value) {
                                       props.updateSearch(event.target.value)
                                   }
                               }}
                        />
                    </div>
            }
            {users}
            {props.isFetching ? <img src={preloader} alt="preloader" className={style.preloader}/> : null}
        </div>
    );
}

export default Users;