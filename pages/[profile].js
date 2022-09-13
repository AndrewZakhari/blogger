import useSWR from "swr";
import { useRouter } from "next/router";
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



export async function getServerSideProps(cxt) {

    return {
        props:{
            data: 'ServerSide'
        }
}
}

export default function Profile() {

    const [deleteState, setDeleteState] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const fetcher = (...args) => fetch(...args).then(res => res.json())
   
    const {data: session} = useSession()


   console.log(session) 



    const router = useRouter();

   const { profile } = router.query;

  


   

   let {data, error} = useSWR(`/api/${profile}`, fetcher)
  
    
   
    
    if(error) return <div className={styles.error}>Failed To Load, <br/> Check your Internet</div>
    if(!data) return <div className={styles.loading}><Loader /></div>
    if(data.blogs === undefined) return <div className={styles.notFound}>404 <br/> User not found</div>
    console.log(data)
   

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
         <Image alt="" src={data.image} width="30px" height="30px"/>
            </div>
            <h1>{data.name}</h1>
            <Link href={`mailto:${data.email}`}>
                <a>
            <p>{data.email}</p>
                </a>
            </Link>
            <ul>
                {data.blogs.map((value, index) => {
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
        <div className={styles.loading}>
        <Loader />
        </div>}
        {!loading &&
        
            <>
        <div className={styles.container}>
            <Login />
            <div className={styles.userWrapper}>
            <div className={styles.imageWrapper}>
         <Image alt="" src={data.image} width="30px" height="30px"/>
            </div>
            <h1>{data.name}</h1>
            <Link href={`mailto:${data.email}`}>
                <a>
            <p>{data.email}</p>
                </a>
            </Link>
            </div>
            <Form />
            <ul>
                {data.blogs.map((value, index) => {
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
        <button value={session.user.name} onClick={() => {setDeleteState(!deleteState)}} >Delete Account</button>
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
