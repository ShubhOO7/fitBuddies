import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./nav-styles.css";
import topBlog from "../../Assets/TopBlogs.jpeg"

export default function Nav({ initialPosts, posts, setPosts }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function filterPosts(searchTerm) {
        if (searchTerm.trim() === "") {
            setPosts(initialPosts);
        } else {
            const filteredPosts = posts.filter(
                (x) =>
                    x.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    x.tags.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPosts(filteredPosts);
        }
    }

    useEffect(() => {
        filterPosts(search);
    }, [search]);

    function resetSearchbar() {
        let searchBar = document.getElementById("searchInput");
        searchBar.value = null;
        setSearch("");
    }

    function readyToSearch() {
        navigate("/posts");
    }

    return (
        <nav>
            <div>
                <img
                    src={topBlog}
                    alt="topBlogs "
                />
                <ul>
                    <li>
                        <Link className="navbarB" onClick={resetSearchbar} to="/newpost">
                            New post
                        </Link>
                    </li>
                    <li>
                        <label htmlFor="search" style={{ color: '#fe0100' }}>Search for post:</label>
                        <input
                            id="searchInput"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={readyToSearch}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
