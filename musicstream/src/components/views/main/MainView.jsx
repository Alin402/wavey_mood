import "./MainView.css";
import React, { useEffect } from "react";
import {useSelector} from "react-redux"
import Search from "../../search/Search";

const LandingView = () => {
    const user = useSelector((state) => state.user.user.user);

    return user && (
        <div className="landing-main">
            <Search />
        </div>
    );
}

export default LandingView;