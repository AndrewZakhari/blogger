import { useState } from "react";
import { useSession , signIn } from "next-auth/react";
import Link from "next/link";


export default function Form() {
    const { data: session } = useSession();
    const [post, setPost] = useState("")

    const handleSubmit = async (e) => {  
        e.preventDefault()
        
        console.log(e.target.blog.value)
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form.entries())

        const res = await fetch('/api/post', {
            body: JSON.stringify(formData),

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        
        setPost('')
    } 
    if(session){
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <textarea onChange={(e) => setPost(e.target.value)} placeholder="Write your blog in markdown" value={post} name="blog" required/>
            <button type="submit">Post</button>
        </form>
        </div>
    )}else{
    return (
        <div>
            <Link href=""><a onClick={() => signIn()}>Sign In to post a blog</a></Link>
        </div>
    )
}
}
