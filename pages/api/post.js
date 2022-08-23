import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from '../../lib/prisma';

export default async function handler(req, res ) {
    
    const session = await unstable_getServerSession(req, res, authOptions);

    if(session) {
        const {blog}  = req.body
        if(req.method === "POST"){
            const user = await prisma.User.findUnique({
            where: {
                name: session.user.name
            },
            select: {
                blogs: true
            }
        })
        
        const length = user.blogs.length + 1;
        user.blogs[length] = blog
        const update = await prisma.User.update({
            where: {
                name: session.user.name,
            },
            data: {
                blogs: user.blogs
            }
        })
       console.log(update)
    }
        res.status(200).redirect('/')
    }else{
        res.send({
            content: "Please Sign In to view this content"
        })
    }
}