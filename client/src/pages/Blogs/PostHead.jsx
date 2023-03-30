import React, { useState, useEffect } from "react";
import Nav from "../Com_Blogs/Nav";
import postData from "./postData.js"
import Home from "./postHome.jsx";
import Navbar from '../../components/Navbar.jsx';

import { useNavigate } from "react-router-dom";
// import PostDetails from "../Com_Blogs/postDetails";

export default function App() {

    const [posts, setPosts] = useState(postData);
    const navigate = useNavigate();
    const ValidUser = async () => {

        let token = localStorage.getItem("usersdatatoken");
        // console.log(token);
        const res = await fetch("/validateUser/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status === 401 || !data) {
            // console.log("Authenticate nhi hai ");
            navigate('/login');
        } else {
            // console.log(data);/
        }

    }
    useEffect(() => {
        setTimeout(() => {
            ValidUser();
        }, 2000)
    }, []);

    return (

        <div className="App">
            <Navbar />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                <Nav initialPosts={postData} posts={posts} setPosts={setPosts} />
                <Home posts={posts} setPosts={setPosts} />
            </div>
        </div>
    );
}