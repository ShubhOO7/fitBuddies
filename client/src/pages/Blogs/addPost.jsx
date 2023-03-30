import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postData from "./postData";
import moment from "moment";
import "./addpost-styles.css";
import Navbar from '../../components/Navbar.jsx';

export default function NewPost() {

    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

    function createNewPost() {
        const newPost = {
            id: newId(),
            url: url,
            title: title,
            postText: postText,
            tags: tags,
            date: moment().format("L")
        };
        postData.push(newPost);
        navigate("/posts");
    }

    function newId() {
        let id;
        if (postData.length === 0) {
            id = 1;
        } else {
            id = postData[postData.length - 1].id + 1;
        }
        return id;
    }

    return (
        <>
            <Navbar />
            <div id="newPostWrapper">
                <h2>Write a new post</h2>
                <form>
                    <div id="imgInput">
                        <label htmlFor="picture">Image</label>
                        <input
                            type="url"
                            id="picture"
                            name="picture"
                            placeholder="Image URL..."
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div id="titleInput">
                        <label htmlFor="title">Title of post</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Post title..."
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div id="textBodyInput">
                        <label htmlFor="postText">Blog post</label>
                        <textarea
                            id="postText"
                            name="postText"
                            placeholder="Write your post here..."
                            onChange={(e) => setPostText(e.target.value)}
                        />
                    </div>
                    <div id="tagsInput">
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Tags..."
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={createNewPost}>
                        Publish
                    </button>
                </form>
            </div>
        </>

    );
}
