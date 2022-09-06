
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export function getServerSideProps(cxt) {
    return {
        props:{

        }
    }
}

export default function Success(){
    

    return (
        <>
        <div>
        Account Deletion successful
        </div>
        </>
    )
}