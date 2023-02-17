import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/header';
import African_American_Church_Art from '../public/African_American_Church_Art.jpg';

export default function Home() {
  console.log(African_American_Church_Art);
  return (
    <div>
      <Header/>
      <h1> Effects of Racism </h1>
      <img src={African_American_Church_Art.src}/>
    </div>
  )
}