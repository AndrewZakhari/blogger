import { useSession, signIn , signOut } from 'next-auth/react'
import { motion } from 'framer-motion';
import styles from '../styles/Login.module.css';
import Image from 'next/image';

import Link from 'next/link';

export default function Login() {
    const { data: session} = useSession();  
    
    if(!session) {
        
        return (
             <div className={styles.signIn}> 
        <button className={styles.button} onClick={() => signIn()}>Sign in</button> 
        
        </div>
        )
    }else if(session){
        
        return (
       
        <div className={styles.signOut}>
            <button onClick={() => signOut()}>
            Sign out
            </button>
            <div className={styles.profile}>
            <Link className={styles.profile} href={`/${session.user.name}`}>
                <a>
            <Image alt="" src={session.user.image} layout="responsive" height="30px" width="30px"/> 
                </a>
            </Link>   
            </div>
            <div className={styles.home}>
            <Link  href="/">
                <a>
            <Image alt="" src="/home.svg" height="30px" width="30px" />
            </a>
            </Link> 
            </div>
            
            </div>
        )
        } 
}