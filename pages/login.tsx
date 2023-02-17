import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const signin =  () => {
         signInWithEmailAndPassword(auth, email, password).then(()=>{window.location.href = "http://localhost:3000/"});
    }
    
    return(
        <>
        <div style={{display: "inline-block", margin: "auto"}}>
        <label>
            Email:
            <input type="text" name="name" onChange={handleEmail}/>
        </label>
        <label>
            Password
            <input type="text" name="post" onChange={handlePassword}/>
        </label>
        <button onClick={signin}> Login </button>
        </div>
        </>
    )
}

export default Login;   