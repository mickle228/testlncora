import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { postActions } from "../../../store";
import { Post } from "../Post";
import css from './Posts.module.css';
import { ModalWindow } from "../../ModalWindow";

interface IProps extends PropsWithChildren {}

const Posts: FC<IProps> = () => {
    const { state: { id } } = useLocation();
    const { posts } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(postActions.getAllByUserId({ id }));
    }, [dispatch, id]);

    const addPost = () => {
        dispatch(postActions.setModalStatus(true));
    };

    return (
        <div>
            <Button variant="contained" className={css.BtnCreate} onClick={addPost}>Add new</Button>
            <ModalWindow />
            <div className={css.list_of_posts}>
                {posts.map(post => <Post key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export { Posts };
