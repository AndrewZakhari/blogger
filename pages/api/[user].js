import prisma from '../../lib/prisma';

export default async function handler(req, res){

    const user = await prisma.User.findUnique({
        where: {
            name: req.query.user
        }
    })
   
    res.status(200).json(user)
}