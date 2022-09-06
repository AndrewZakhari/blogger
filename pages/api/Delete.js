import prisma from '../../lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    const value = JSON.parse(req.body.value)

    const user = await prisma.User.findUnique({
        where: {
            name: session.user.name
        }
    })
    const {blogs} = user

    const updatedBlogs = blogs.splice(value + 1, blogs.length)

    const update = await prisma.User.update({
        where: {
            name: session.user.name
        },
        data: {
            blogs: updatedBlogs       
        }
    })

    console.log(update)



    res.status(200).redirect(`/${session.user.name}`)
}