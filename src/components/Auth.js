import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config.js";
import Cookies from "universal-cookie";
import {} from "../styles/auth.css"
import googlelogo from "../images/google-logo.webp"




const cookies = new Cookies()


export const Auth = (props) =>{
  const {setisAuth} = props;

  const signInWithGoogle = async () =>{
    try{
    const result = await signInWithPopup(auth, provider)
    cookies.set("auth-token", result.user.refreshToken)
    setisAuth(true)
    }
    catch(err){
      console.error(err);
    };
  }



  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome to Chat App</h1>
        <p>Sign in with Google to continue</p>
        <button className="google-signin-btn" onClick={signInWithGoogle}>
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }}
/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}