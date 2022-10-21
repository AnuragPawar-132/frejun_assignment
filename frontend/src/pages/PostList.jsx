import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import styles from "../styles/PostList.module.css"
import { useNavigate } from 'react-router-dom';

const PostList = () => {

    const [postsList, setPostsList] = useState([])
    const navigate = useNavigate()

    const fetchThePostList = () =>{
        axios.get("https://mighty-coast-34651.herokuapp.com/posts")
        .then((res)=>{setPostsList(res.data)})
        .catch((err)=>console.log(err))
    }

    const handleRedirect = (id) =>{
        navigate(`/${id}`)
    }

    useEffect(()=>{
        fetchThePostList()
    }, [])
  return (
    <div>
        <h2>See all posts here</h2>
        <div className={styles.posts_main_div} >
            {
            postsList.length>0 && postsList.map((el)=>{
                return <div className={styles.small_boxes} onClick={()=>handleRedirect(el._id)} >
                    <h3>{el.title}</h3>
                    <p>Category: {el.category}</p>
                    <p>{el.body}</p>
                </div>
            })
            }
        </div>
    </div>
  )
}

export default PostList