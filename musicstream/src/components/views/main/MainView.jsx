import React, { useEffect } from "react";
import {useSelector} from "react-redux"

const LandingView = () => {
    const user = useSelector((state) => state.user.user.user);

    return user && (
        <div className="landing">
            kfjcdkfnv
            fvkjnkvfd
            dfkvj
            <h2>{ user.email }</h2>
        </div>
    );
}

export default LandingView;