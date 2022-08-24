import { useSession, signIn , signOut } from 'next-auth/react'
import { motion } from 'framer-motion';
import styles from '../styles/Login.module.css';
import Image from 'next/image';

export default function Login() {
    const { data: session} = useSession();  
    
    if(!session) {
        
        return (
             <div className={styles.signIn}>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button> 
        </div>
        )
    }else {
        return (
       
        <div className={styles.signOut}>
            Signed In as {session.user.name} < br/>
            <button onClick={() => signOut()}>
            Sign out
            </button>
            </div>
        )
        } 
}