import { useState, useEffect } from "react";
import "./App.css";
import Player from "./components/player/Player";
import LandingView from "./components/views/landing/LandingView";
import MainView from "./components/views/main/MainView";
import SignUpView from "./components/views/signup/SignUpView";
import LogInView from "./components/views/signup/LogInView"
import Navigation from "./components/navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/ProtectedRoute";
import AlertList from "./components/alerts/AlertList";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/user";
import ProfileView from "./components/views/profile/ProfileView";
import { LOGOUT } from "./actions/types";
import setAuthToken from "./utils/setAuthToken";
import Create from "./components/generic/create/Create";
import { MdOutlineQueueMusic as PlaylistIcon } from "react-icons/md";
import { MdLibraryMusic as AlbumIcon } from "react-icons/md";
import { IoMusicalNotes as SongIcon } from "react-icons/io5";
import Modal from "./components/generic/modal/Modal";
import AddAlbumForm from "./components/album/add-album/AddAlbumForm";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [openCreate, setOpenCreate] = useState(false);
  const [openAlbumModal, setOpenAlbumModal] = useState(false);

  useEffect(() => {
    console.log(user)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    
    dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch({ type: LOGOUT });
    });
  }, [])

  const [isAudioPlay, setIsAudioPlay] = useState(false);

  const pauseAudio = () => {
    setIsAudioPlay(false);
  }

  const playAudio = () => {
    setIsAudioPlay(true);
  }

  return (
    <div className="main">
      <Navigation />

      <div className='middle'>
        <Routes>
          <Route path="/" element={<LandingView isAudioPlay={isAudioPlay} />} />
          <Route path="/signup" element={<SignUpView isAudioPlay={isAudioPlay} />} />
          <Route path="/login" element={<LogInView isAudioPlay={isAudioPlay} />} />
          <Route
            path="profile"
            element={<PrivateRoute component={ProfileView} />}
          />
          <Route
            path="main"
            element={<PrivateRoute component={MainView} />}
          />
        </Routes>
      </div>
      <div className="bottom">
        <Player
          pause={pauseAudio}
          play={playAudio}
        />
      </div>
      {
        user?.isAuthenticated &&
        <>
          <Create
            open={openCreate}
            setOpen={setOpenCreate}
          >
          <div className="add-album-container">
              <PlaylistIcon className="add-album-icons" size={40} />
              <AlbumIcon 
                onClick={() => { setOpenAlbumModal(true); setOpenCreate(false)} } 
                className="add-album-icons" 
                size={40} 
              />
              <SongIcon className="add-album-icons" size={40} />
            </div>
          </Create>

          <Modal
            color={"#ef5aa0"}
            open={openAlbumModal}
            setOpen={setOpenAlbumModal}
          >
            <AddAlbumForm />
          </Modal>
        </>
      }
      <AlertList />
    </div>
  )
}

export default App;