import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PostList from './PostList'
import SinglePost from './SinglePost'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<PostList/>}/>
            <Route path='/:id' element={<SinglePost/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes