import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import initialPosts from "../Blogs/postData";
import "./postdetails-styles.css";
import Navbar from '../../components/Navbar.jsx';

const postDeta = function PostDetails() {
    const [post, setPost] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        const viewPost = initialPosts.find((post) => post.id === parseInt(id, 10));
        setPost(viewPost);
    }, [id]);

    return post ? (
        <>
            <Navbar />
            <div id="viewPostWrapper">
                <h2 style={{ width: '50%' }}>{post.title}</h2>
                <img src={post.url} alt="thumbnail" />
                <p>{post.postText}</p>
                <em>{post.date} </em>
            </div>
        </>

    ) : null;
}
export default postDeta;