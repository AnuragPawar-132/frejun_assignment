import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from "../styles/PostList.module.css"

const SinglePost = () => {

    const [postBody, setPostBody] = useState([])
    const params = useParams();
    let id = params.id;

    const fetchTheSinglePost = () =>{
        axios.get(`https://mighty-coast-34651.herokuapp.com/posts/${id}/start-with-a`) 
        .then((res)=>setPostBody(res.data))
        .catch((err)=>console.log(err))
    }

    const handleUpdateBody = () =>{
        axios.get(`https://mighty-coast-34651.herokuapp.com/posts/${id}/change-with-*`)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        fetchTheSinglePost()
    }

    useEffect(()=>{
        fetchTheSinglePost()
    }, [])
    console.log(postBody)
  return (
    <div>
        <h1>Selected post is here</h1>
        {
            postBody.length>0 && postBody.map((el)=>{
                return <div key={el} className={styles.body_arr} >
                    <p>{el}</p>
                </div>
            })
        }
        <button onClick={handleUpdateBody} >Change A with *</button>
    </div>
  )
}

export default SinglePost