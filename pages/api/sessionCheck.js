import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    if(session){
        res.status(200).send("Authenticated")
    }else if(!session) {
        res.status(200).send("Not Authenticated")
    }

}