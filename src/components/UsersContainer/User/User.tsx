import {FC, PropsWithChildren} from "react";
import {IUser} from "../../../interfaces";

interface IProps extends PropsWithChildren {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, name} = user;
    return (
        <div>
            <div>id: {id}</div>
            <div>name: {name}</div>
            {/*<button onClick={() => navigate(`/user-details/${id}`, {state: {user}})}>getDetails</button>*/}
        </div>
    );
};

export {User};