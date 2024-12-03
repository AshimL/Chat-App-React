import { useEffect, useState } from "react";
import { 
  addDoc, 
  collection, 
  serverTimestamp,
  onSnapshot, 
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth"
import {} from '../styles/chat.css'



export const Chat = (props) =>{
  const {room} = props
  const [user] = useAuthState(auth)
  const [newMessage, setNewMessage] = useState("");// sending message
  const [messages, setMessage] = useState([])// messages from db
  const messagesRef = collection(db, "messages")


  //Getting the Text message from the db
  useEffect(() =>{
    const queryMessages = query(
      messagesRef, 
      where("room", "==", room,),
      orderBy("createdAt")
    )
   const unsubscribe =  onSnapshot(queryMessages, (snapshot) =>{
      let messages = [];
      snapshot.forEach((doc) =>{
        messages.push({...doc.data(), id: doc.id})
      }); 
      setMessage(messages)
    });


    return () => unsubscribe();
  }, [])

 


  //Submitting the messages to db
  const handleSubmit =  async (e) =>{
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.displayName,
      room,  
    });

    setNewMessage("");
  }




  return (
    <div className="chat-app">
      <div className="chat-header">
        <h1>Room: {room.toUpperCase()}</h1>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            className={`message ${
              message.user === user.displayName ? "own-message" : ""
            }`} 
            key={message.id}
          >
            <span className="user">{message.user}</span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>

      
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          className="chat-input"
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
  );
} 