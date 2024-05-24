import {FC, PropsWithChildren} from "react";
import Button from "@mui/material/Button";

import {IPost} from "../../../interfaces";
import css from './Post.module.css'
import {useNavigate} from "react-router-dom";
interface IProps extends PropsWithChildren {
    post: IPost
}

const Post: FC<IProps> = ({post}) => {
    const {id, userId, title, body} = post;
    const navigate = useNavigate();

    return (
        <div className={css.Post}>
            <div>post Id: {id}</div>
            <div>user Id: {userId}</div>
            <div>title: {title}</div>
            <div>body:</div>
            <div  className={css.BottomBox}>{body}</div>
            <Button variant="contained" className={css.Btn} onClick={() => navigate(`/posts/${id}`, {state: {post}})}>Details</Button>
        </div>
    );
};

export {Post};