import React from "react";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";

import { getUser } from "../../store/user/reducer";

export const Profile = () => {
    const user = useSelector(getUser);

    return (
        <div gap={3}>
            <h1>Profile</h1>
            <ReactJson src={user.toJSON()} />
        </div>
    );
};