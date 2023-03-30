import React from "react";
import { useNavigate } from "react-router-dom";
import "./post-styles.css";

export default function Post({ id, url, title, date, onDelete }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/post/${id}`);
    }


    return (
        <>
            <li id="postAndButton">
                <div id="postPreview" onClick={handleClick}>
                    <img src={url} alt="thumbnail" />
                    <h2>{title}</h2>
                    <em>{date}</em>
                </div>
            </li>
        </>

    );
}
