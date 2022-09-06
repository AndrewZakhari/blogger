import prisma from '../../lib/prisma'


export default async function handler(req ,res) {
    const value = JSON.parse(req.body.value)
    console.log(value)
    
    const deletedAccount = await prisma.User.delete({
        where: {
            name: value
        }
    })
    console.log(deletedAccount)
    res.status(200).json({message: "Success"})
}