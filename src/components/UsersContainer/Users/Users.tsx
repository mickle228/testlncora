import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../store";
import {User} from "../User/User";
import css from './Users.module.css'

const Users = () => {
    const {users} = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(userActions.getAll())
    }, [dispatch, users])

    return (
        <div className={css.list_of_episodes}>
            {users.map(user => <User key={user.id} user={user}/>)}
        </div>
    );
};

export {Users};