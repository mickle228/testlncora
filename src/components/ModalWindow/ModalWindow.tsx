import Modal from '@mui/material/Modal';
import {FC, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {postActions} from "../../store";
import {IPost} from "../../interfaces";
import css from './ModalWindow.module.css'

const ModalWindow: FC = () => {
    const dispatch = useAppDispatch();
    const {modalStatus, postForUpdate} = useAppSelector(state => state.posts)
    const {reset, register, handleSubmit, setValue} = useForm<IPost>();

    const handleClose = () => {
        dispatch(postActions.setPostForUpdate(null))
        dispatch(postActions.setModalStatus(false))
    }

    useEffect(() => {
        if (postForUpdate){
            setValue('title', postForUpdate.title)
            setValue('body', postForUpdate.body)
        }
    }, [postForUpdate, setValue])

    const save: SubmitHandler<IPost> = (item) => {
        dispatch(postActions.create({item}))
        dispatch(postActions.setModalStatus(false))
        dispatch(postActions.setPostForUpdate(false));
        reset()
    };

    const edit: SubmitHandler<IPost> = async (item) => {
        if (postForUpdate) {
            await dispatch(postActions.update({ id: postForUpdate.id, item }));
             dispatch(postActions.setModalStatus(false));
             dispatch(postActions.setPostForUpdate(false));
            reset();
        }
    };

    return (
        <div>
            <Modal
                open={modalStatus}
                onClose={handleClose}
            >
                    <div className={css.Wrapper}>
                        <h1>{postForUpdate?'Update Post':'Add New Post'}</h1>
                        <form onSubmit={handleSubmit(postForUpdate ? edit : save)}>
                            <input type="text" required={true} placeholder={'title'} {...register('title')}/>
                            <input type="text" required={true} placeholder={'body'} {...register('body')}/>
                            <button>{postForUpdate?'Update':'Add Post'}</button>
                        </form>
                    </div>
            </Modal>
        </div>
    );
};

export {ModalWindow};