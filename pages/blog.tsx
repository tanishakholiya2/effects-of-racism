import Head from "next/head";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/header";

const addPost = (name: string, post: string) => {
    try{
        const docRef = addDoc(collection(db, "posts"), {
        name: name,
        post: post,
    }).then(()=>{window.location.reload()})
   // window.location.reload();
    }
    catch(e) {
        console.error('');
    }
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState([]);
    const [posting, setPosting] = useState(true);
    const [isSignedIn, setSignedIn] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.email;
          setSignedIn(true);
          setId(user.uid);
        } else {
          setSignedIn(false);
          setId("");
        }
      });
   
    const displayPost = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const temp = [...posts];
        querySnapshot.forEach((doc) => {
            temp.push({name: doc.get('name'), post: doc.get('post')});
            setPosts(temp);
        });
    }

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
    

    const handleClick = () => {
        setPosting(!posting);
    }
    useEffect(()=>{
        displayPost();
    }, [])
    return(
        <>
            <Header/>
            {name!="" && <Post nameProp={name} uid={id} userPosts={userPosts}/>}
            <div>
            {posts.map((post) => {
                console.log(post);
                return(
                    <>
                    <div style={{borderStyle:'solid', borderWidth:'1px', marginBottom:'5px', marginLeft:'10px', marginRight:'60px'}}>
                    <p> Author: {post.name} </p>
                    <h4> {post.post} </h4>
                    </div>
                    </>
                )
            })}
            </div>
        </>
    )
}
const Post = ({nameProp, uid, userPosts}) => {
    const [name, setName] = useState(nameProp);
    const [post, setPost] = useState("");
    console.log('name: ' + name + ' post: ' + post );
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePost = (event) => {
        setPost(event.target.value);
    }
    const addPostToProfile = () => {
        let temp = [...userPosts];
        temp.push(post);
        console.log(temp);
        try{
            const docRef = setDoc(doc(db, "users", uid), {
            name: name,
            posts: temp,
        })
        }
        catch(e) {
            console.error(e);
        }
    }
    return(
        <div>
            <h4> Add Post</h4>
                <p>
                <label>
                    Name:
                    <input type="text" name="name" onChange={handleNameChange} value={name}/>
                </label></p>
                <p>
                <label>
                    Post
                    <input type="text" name="post" onChange={handlePost}/>
                </label> </p>
                <button onClick={()=>{
                    addPost(name, post);
                    addPostToProfile();
                }}> add </button>
        </div>
    )
}



export default Blog;