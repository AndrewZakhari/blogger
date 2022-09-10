import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/login'
import { PrismaClient } from '@prisma/client';
import Form from '../components/Form';
import ReactMarkdown from 'react-markdown';
import prisma from '../lib/prisma';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import Loader from '../components/Loader';


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

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data1, error } = useSWR('/api/sessionCheck', fetcher)

  if(error) {
    const timer = setTimeout(() => {
      return
    }, 2000)
  return (
   <>
   {clearTimeout(timer)}
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <div>
        <Login />
      </div>
      <Form />
      </div>    
      <div>
        {data.data.map((value, index) => {
          if(value.blogs !== []){
          return (
            <div key={index}>
              <div className={styles.userWrapper}>
                <div className={styles.imageWrapper}>
              <Image key={value.image} src={value.image} width="30px" height="30px" /> 
              </div>
              <h1 key={value.name}>{value.name}</h1>
              </div>
              <div className={styles.blogsWrapper}>
              {value.blogs.map((value , index) => {
                return (
                  <ReactMarkdown className={styles.blog} name="blog" key={index}>{value}</ReactMarkdown>
                )
              })}
              </div>
            </div>
          )}else if(value.blogs === []){
            return (
            <div>
              
              </div>
              )
          }
        })}
      </div> 
 
    </div>
        </>
  )
}
  if(!data1) return (
    <div className={styles.loading}>
      <Loader />

    </div>
  )
}

