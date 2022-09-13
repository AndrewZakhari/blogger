import prisma from '../../lib/prisma';

export default async function handler(req, res){

    const user = await prisma.User.findUnique({
        where: {
            name: req.query.user
        }
    })
   if(user === null){
        res.status(404).json({message: "Invalid Username"})
    }else{
    res.status(200).json(user)
    }
}