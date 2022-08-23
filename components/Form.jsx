import { useState } from "react";


export default function Form() {

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

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <textarea onChange={(e) => setPost(e.target.value)} placeholder="Write your blog in markdown" value={post} name="blog" required/>
            <button type="submit">Post</button>
        </form>
        </div>
    )
}