import {FC, PropsWithChildren} from "react";

import {IComment} from "../../../interfaces";
import css from './Comments.module.css'

interface IProps extends PropsWithChildren {
    comment: IComment;
}

const Comments: FC<IProps> = ({comment}) => {
    const {id, name, email, body} = comment

    return (
        <div  className={css.Post}>
            <div>id:{id}</div>
            <div>name:{name}</div>
            <div>email:{email}</div>
            <div>body:{body}</div>
        </div>
    );
};

export {Comments};