import React from "react";
import Post from "../Com_Blogs/Post";
import "./post.css";

export default function Home({ posts, handleDelete }) {
    return (
        <ul id="homeWrapper">
            {posts
                .slice(0)
                .reverse()
                .map((post) => (
                    <Post
                        onDelete={handleDelete}
                        key={post.id}
                        id={post.id}
                        url={post.url}
                        title={post.title}
                        date={post.date}
                    />
                ))}
        </ul>
    );
}
