import { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import {} from "../src/styles/App.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setisAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setisAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return <Auth setisAuth={setisAuth} />;
  }

  return (
    <div className="app-container">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room-container">
          <div className="room-card">
            <h2>Welcome to Chat App</h2>
            <label htmlFor="room">Enter Room Name</label>
            <input id="room" ref={roomInputRef} placeholder="Room name..." />
            <button
              className="enter-chat-btn"
              onClick={() => setRoom(roomInputRef.current.value)}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
      <div className="sign-out-container">
        <button className="sign-out-btn" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;
