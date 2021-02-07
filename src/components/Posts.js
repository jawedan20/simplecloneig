import React from 'react'
import '../Posts.css'

function Posts({ imageUrl }) {
    return (
        <img
            src={imageUrl}
            className="image_posts"
        />
    )
}

export default Posts
