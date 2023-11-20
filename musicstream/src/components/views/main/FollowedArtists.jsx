import "./MainView.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getNormalUserProfile
} from "../../../actions/profile";
import FollowedArtist from "./FollowedArtist";

const FollowedArtists = () => {
    const dispatch = useDispatch();
    const followedArtists = useSelector((state) => state.profile.profile.followedArtists)

    useEffect(() => {
        dispatch(getNormalUserProfile((profile) => {}));
    }, [])
    return followedArtists && (
        <div className="recently-viewed">
            <h2 className="signup-title">followed artists</h2>
            <div className="followed-artists-container">
                {
                    followedArtists.length !== 0 && followedArtists?.map((artistId, index) => {
                        return <FollowedArtist key={index} artistId={artistId} />
                    })
                }
            </div>
        </div>
    )
}

export default FollowedArtists;