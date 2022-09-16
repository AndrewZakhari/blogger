import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import Form from '../components/Form'
import styles from '../styles/Profile.module.css'
import Login from '../components/login'
import Loader from "../components/Loader";
import Link from "next/link";
import prisma from "../lib/prisma";



export async function getServerSideProps(cxt) {
    
   const user = await prisma.User.findUnique({
        where: {
            name: cxt.query.profile
        }
    }) 


    return {
        props:{
            serverData: user
        }
}
}

export default function Profile(serverData) {

    const [deleteState, setDeleteState] = useState(false);
    const [loading, setLoading] = useState(false);
   
   
   
    const {data: session} = useSession()

    console.log(serverData)
   console.log(session) 
    
    if(serverData.serverData === null) return <div className={styles.notFound}>404 <br/> User not found</div>
    console.log(serverData.serverData)
   

    const handleDelete = async (e) => {
        setLoading(true)
        const value = JSON.stringify(e.target.value)
        console.log(value)
        await axios({
            method: "post",
            url: "/api/Delete",
            data: {
               value
            }
        })
        window.location.reload();
      setLoading(false);
    }
    const deleteAccount = async (e) => {
        setLoading(true)
        const value = JSON.stringify(e.target.value)
        console.log(value)
        await axios({
            method: "post",
            url: "/api/deleteAccount",
            data: {
                value
            }
        }) 
        setLoading(false);
    }

    
    if(!session){
    return (
        <>
        <div className={styles.container}>
            <Login />
            
            <div>
         <Image alt="" src={serverData.serverData.image} width="30px" height="30px"/>
            </div>
            <h1>{serverData.serverData.name}</h1>
            <Link href={`mailto:${serverData.serverData.email}`}>
                <a>
            <p>{serverData.serverData.email}</p>
                </a>
            </Link>
            <ul>
                {serverData.serverData.blogs.map((value, index) => {
                   return(
                    <li key={index}> <ReactMarkdown key={index}>{value}</ReactMarkdown></li>
                   )
                })}
            </ul>
        </div>
        </>
    )
}else if(session){
    return (
        
        <>
        {loading && 
        
        <Loader />
}
        {!loading &&
        
            <>
        <div className={styles.container}>
            <Login />
            <div className={styles.userWrapper}>
            <div className={styles.imageWrapper}>
         <Image alt="" src={serverData.serverData.image} width="30px" height="30px"/>
            </div>
            <h1>{serverData.serverData.name}</h1>
            <Link href={`mailto:${serverData.serverData.email}`}>
                <a>
            <p>{serverData.serverData.email}</p>
                </a>
            </Link>
            </div>
            <Form />
            <ul>
                {serverData.serverData.blogs.map((value, index) => {
                   return(
                    <div key={index}>
                    <li> <ReactMarkdown key={index}>{value}</ReactMarkdown></li>
                    <button key={index} value={value} onClick={handleDelete}>Delete</button>
                    <hr />
                    </div>
                   )
                })}
            </ul>
        </div>
        <button className={styles.firstDeleteButton} value={session.user.name} onClick={() => {setDeleteState(!deleteState)}} >Delete Account</button>
        {deleteState && 
        <>
        <div className={styles.deleteContainer}>
            You are about to Delete your account, <br />
            This Action can not be undone!<br />
            <div className={styles.buttonsWrapper}>
            <button className={styles.delete} value={session.user.name} onClick={deleteAccount}>Delete</button>
            <br/>
            <button className={styles.keep} onClick={() => {setDeleteState(false)}}>Keep Account</button>
            </div>
        </div>
        </>
        }
       </> 
        }
       
        </>

    )
}
}
