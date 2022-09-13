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
import { useState } from 'react';
import Link from 'next/link';


export async function getServerSideProps() {
   const query = await prisma.user.findMany() 
   return {
    props: {
      data: query
    }
   }
}

export default function Home(data) {

  console.log(data.data)
  
  const [openedBlog , setOpenedBlog]  = useState()

  const openBlog = (e) => {
    e.preventDefault();
console.log(e.target.value)
    setOpenedBlog(e.target.value)
  }

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
              <Image alt="" key={value.image} src={value.image} width="30px" height="30px" /> 
              </div>
              <Link href={`/${value.name}`}>
                <a>
              <h1 key={value.name}>{value.name}</h1>
              </a>
              </Link>
              </div>
              <div className={styles.blogsWrapper}>
              {value.blogs.map((value , index) => {
                if(value === openedBlog) {
                  console.log(openedBlog)
                  return (
                    <div className={styles.openedBlogWrapper}>
                      <ReactMarkdown className={styles.openedBlog} name="blog" key={index}>{value}</ReactMarkdown>
                      <button className={styles.viewLess} onClick={() => setOpenedBlog()}>View less</button>
                    </div>
                  )
                }
                else{
                return (
                 <div> 
                  <ReactMarkdown className={styles.blog} name="blog" key={index}>{value}</ReactMarkdown>
                  <button className={styles.viewMore} value={value} onClick={openBlog}>View More</button>
                 </div> 
                )
                } 
              })}
              </div>
              <>
              
              <div className={styles.users}>
                <h5 style={{margin: '0px'}}> Users </h5>
                <div className={styles.nameAndImage}>
                <div className={styles.imageWrapper}>
        <Image alt="" src={value.image} width="30px" height="30px"/>
        </div>
        <Link className={styles.userLink} href={`/${value.name}`}>
          <a>
        <p>{value.name}</p>
        </a>
        </Link>
        </div>
        </div>
        </>
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

