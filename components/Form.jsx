import { useState } from "react";
import { useSession , signIn } from "next-auth/react";
import Link from "next/link";
import styles from '../styles/Form.module.css'
import Loader from './Loader';

export default function Form() {
    const { data: session } = useSession();
    const [post, setPost] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {  
        e.preventDefault()
        
        setLoading(true)
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form.entries())

        const res = await fetch('/api/post', {
            body: JSON.stringify(formData),

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        setLoading(false) 
        setPost('')
        window.location.reload();
        return
    } 
    if(session){
    return (
        <div>
            {!loading && 
            <form className={styles.form} onSubmit={handleSubmit}>
            <textarea className={styles.txtArea} onChange={(e) => setPost(e.target.value)} placeholder="Write your blog in markdown" value={post} name="blog" required/>
            <button className={styles.button} type="submit">Post</button>
            </form>
        }
        {loading && 
        <div className={styles.loading}>
            <Loader /> 
        </div> 
         }
        
        </div>
        )}else{
    return (
        <div>
            <Link href=""><a onClick={() => signIn()}>Sign In to post a blog</a></Link>
        </div>
    )
}
}
