import "./MainView.css";
import React, { useEffect } from "react";
import {useSelector} from "react-redux"
import Search from "../../search/Search";
import RecentlyViewed from "./RecentlyViewed";
import FollowedArtists from "./FollowedArtists";
import LatestReleased from "./LatestReleased";

const LandingView = () => {
    const user = useSelector((state) => state.user.user.user);

    return user && (
        <div className="landing-main">
            <Search />
            <div style={{ marginTop: "2rem" }}>
                <RecentlyViewed />
            </div>

            <div style={{ marginTop: "2rem" }}>
                {
                    !user.isArtist &&
                    <FollowedArtists />
                }
            </div>

            <div style={{ marginTop: "2rem" }}>
                <LatestReleased />
            </div>

            <div style={{ height: "2rem" }}></div>
        </div>
    );
}

export default LandingView;