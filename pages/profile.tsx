import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { auth, db } from "../firebase";
import Signup from "../pages/signup";

const Profile: React.FC = () => {
    const [isSignedIn, setSignedIn] = useState(false);
    const [userEmail, setEmail] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [userPosts, setUserPosts] = useState([]);
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
    const getUserPosts = async () => {
        if(isSignedIn) {
            const userInfo = await getDoc(doc(db, "users", id));
            setUserPosts(userInfo.data().posts);}
        else{
            setUserPosts([]);
        }
        }
    useEffect(()=>{
      getName();
      getUserPosts();
    }, [isSignedIn])

    return(
        <>
            <Header/>
            <h1> {name} </h1>
            <h3> see your posts </h3>
            {userPosts.map((post)=>{
              return(
              <div style={{borderStyle:'solid', borderWidth:'1px', marginBottom:'5px', marginLeft:'10px', marginRight:'60px'}}>
               <p> {post} </p>
               </div>);
            })}
        </>
    )
}

export default Profile;