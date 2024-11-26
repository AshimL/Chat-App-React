import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase-config.js"

import Cookies from "universal-cookie"
const cookies = new Cookies()


export const Auth = (props) =>{
  const {setisAuth} = props;

  const signInWithGoogle = async () =>{
    try{

    const result = await signInWithPopup(auth, provider)
    cookies.set("auth-token", result.user.refreshToken)
    setisAuth(true)
    }catch(err){
      console.error(err);
    };
  }



  return(  
  <div className="auth">
    <p> Sign in with google to continue</p>

    <button onClick={() => signInWithGoogle()}> Sign in with Google</button>
  </div>)
}