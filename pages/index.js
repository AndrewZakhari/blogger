import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/login'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
   const query = await prisma.User.findMany() 
   return {
    props: {
      data: query
    }
   }
}

export default function Home(data) {
  console.log(data.data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Login />
      </div>
      {data.data.map((item, index) => {
        return (
          <div key={index}>
            <div>
              <Image src={item.image} width="20px" height="20px"/>

            </div>
            <p >{item.name}</p>
            <p>{item.blogs[0]}</p>
            </div>
        )
      })}
 
    </div>
  )
}
