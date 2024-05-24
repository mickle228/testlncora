import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { commentActions } from "../../../store";
import { Comments } from "../../CommentsContainer";
import css from "./PostDetails.module.css";
import { postService } from "../../../services";
import { postActions } from "../../../store";
import { ModalWindow } from "../../ModalWindow";

interface IProps extends PropsWithChildren {}

const PostDetails: FC<IProps> = () => {
    const { state: { post } } = useLocation();
    const { id, userId } = post;
    const { comments } = useAppSelector(state => state.comments);
    const { posts, postForUpdate } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [currentPost, setCurrentPost] = useState(post);

    console.log(posts);

    useEffect(() => {
        dispatch(commentActions.getById({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (postForUpdate) {
            setCurrentPost(postForUpdate);
        }
    }, [postForUpdate]);

    const deletePost = async () => {
        await postService.delete(id);
        navigate(-1);
        alert("Post was deleted");
    };

    const editPost = () => {
        dispatch(postActions.setPostForUpdate(currentPost));
        dispatch(postActions.setModalStatus(true));
    };

    return (
        <div className={css.Wrapper}>
            <h1>Post</h1>
            <div className={css.Box}>
                <div>post Id: {id}</div>
                <div>user Id: {userId}</div>
                <div>title: {currentPost.title}</div>
                <div>body:</div>
                <div>{currentPost.body}</div>
            </div>
            <div className={css.btns}>
                <Button variant="contained" onClick={editPost}>Edit</Button>
                <div className={css.middleBox}></div>
                <Button variant="contained" onClick={deletePost}>Delete</Button>
            </div>
            <ModalWindow />
            <h1>Comments</h1>
            <div className={css.list_of_posts}>
                {comments.map(comment => <Comments key={comment.id} comment={comment} />)}
            </div>
        </div>
    );
};

export { PostDetails };
