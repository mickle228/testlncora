import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../store";
import {User} from "../User";
import css from './Users.module.css'

const Users = () => {
    const {users} = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.getAll())

    }, [dispatch])

    return (
        <div className={css.list_of_users}>
            {users.map(user => <User key={user.id} user={user}/>)}
        </div>
    );
};

export {Users};