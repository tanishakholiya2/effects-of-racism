import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";


  const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const createUser =() => {
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        let id=user.uid;
        console.log(id);
        try{
          const docRef = setDoc(doc(db, "users", id), {
          name: name,
          posts: [],
      }).then(()=>{window.location.href = "http://localhost:3000/"})
  }
      catch(e) {
          console.error(e);
      }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleName = (event) => {
      setName(event.target.value);
    }

    return(
        <>
        <label>
            Email:
            <input type="text" name="email" onChange={handleEmail}/>
        </label>
        <label>
            Password
            <input type="text" name="post" onChange={handlePassword}/>
        </label>
        <label>
          Name
          <input type="text" name="name" onChange={handleName}/>
        </label>
        <a><button onClick={createUser}> sign up </button></a>
        </>
    )
  }
  export default Signup;