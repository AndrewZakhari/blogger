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



export async function getServerSideProps(cxt) {

    return {
        props:{

        }
}
}

export default function Profile() {
    const [deleteState, setDeleteState] = useState(false);
    const [accountStatus, setAccountStatus] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const fetcher = (...args) => fetch(...args).then(res => res.json())
   
    const {data: session} = useSession()


   console.log(session) 

   const router = useRouter();

   const { profile } = router.query;
   if(loading || !loading){
    let { data, error} = useSWR(`/api/${profile}`, fetcher)
   
    
    if(error) return <div>Failed To Load</div>
    if(!data) return <div>...Loading</div>
    if(data.blogs === undefined) return <div>404 User not found</div>
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
        <div>
            <Login />
            <div>
         <Image src={data.image} width="30px" height="30px"/>
            </div>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
            <ul>
                {data.blogs.map((value, index) => {
                   return(
                    <li> <ReactMarkdown key={index}>{value}</ReactMarkdown></li>
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
        <div>
            <Login />
            <div>
         <Image src={data.image} width="30px" height="30px"/>
            </div>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
            <Form />
            <ul>
                {data.blogs.map((value, index) => {
                   return(
                    <div key={index}>
                    <li> <ReactMarkdown>{value}</ReactMarkdown></li>
                    <button value={value} onClick={handleDelete}>Delete</button>
                    </div>
                   )
                })}
            </ul>
        </div>
        <button value={session.user.name} onClick={() => {setDeleteState(!deleteState)}} >Delete Account</button>
        {deleteState && 
        <>
        <div>
            You're about to Delete your account, <br />
            This Action can't be undone!
            <button value={session.user.name} onClick={deleteAccount}>Delete</button>
            <button onClick={() => {setDeleteState(false)}}>Keep Account</button>
        </div>
        </>
        }
       </> 
        }
       
        </>

    )
}
}
}
