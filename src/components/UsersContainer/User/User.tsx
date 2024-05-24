import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';

import {IUser} from "../../../interfaces";
import css from './User.module.css'

interface IProps extends PropsWithChildren {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, name} = user;
    const navigate = useNavigate();

    return (
        <div className={css.User}>
            <div>id: {id}</div>
            <div className={css.BottomBox}>name: {name}</div>
            <Button variant="contained" className={css.Btn} onClick={() => navigate(`/user/${id}/posts`, {state: {id}})}>Posts</Button>
        </div>
    );
};

export {User};