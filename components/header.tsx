import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Signup from "../pages/signup";

const Header: React.FC = () => {
    const [isSignedIn, setSignedIn] = useState(false);
    const [userEmail, setEmail] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.email;
          setSignedIn(true);
          setEmail(uid);
          setId(user.uid);
        } else {
          setSignedIn(false);
          setEmail("");
          setId("");
        }
      });
    const getName = async() => {
      if(isSignedIn) {
      const userInfo = await getDoc(doc(db, "users", id));
      setName(userInfo.data().name);}
      else{
        setName("");
      }
    }
    useEffect(()=>{
      getName()
    }, [isSignedIn])
    return(
        <>
            <div style={{display: 'flex', gap: '10px'}}>
                <Link href="/"> <button style={{borderRadius:'15px'}}> Home </button> </Link>
                <Link href="/systemicracism"> <button style={{borderRadius:'15px'}}> Systemic Racism </button> </Link>
                <Link href="/history"> <button style={{borderRadius:'15px'}}> History of Racism </button> </Link>
                <Link href="/howtohelp"> <button style={{borderRadius:'15px'}}> How you can help </button> </Link>
                <Link href="/blog"> <button style={{borderRadius:'15px'}}> Blog </button> </Link>
                {isSignedIn && <Link href="/profile"><button style={{borderRadius:'15px'}}> {name} </button></Link>}
                {isSignedIn && <button style={{borderRadius:'15px'}} onClick={() => auth.signOut()}> Logout </button>}
                {!isSignedIn && <Link href="/signup"> <button style={{borderRadius:'15px'}}> Signup </button> </Link> }
                {!isSignedIn && <Link href="/login"> <button style={{borderRadius:'15px'}}> Login </button> </Link> }
            </div>
        </>
    );
}
export default Header;