/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../components/Navbar'
import "../Css/discuss.css";
import { useNavigate } from "react-router";
import Card from '@mui/material/Card';
// import { AddComment, AddUser } from "../actions/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';

const URL = "/comment/";
const addURL = "/addcomment/";

function Discuss() {
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
            // console.log(data);
        }

    }
    useEffect(() => {
        setTimeout(() => {
            ValidUser();
        }, 2000)
    }, []);

    const navigate = useNavigate();

    const { comment, email } = useSelector((state) => state.UpdateUser);
    const dispatch = useDispatch();
    var group = [
        "Benjamin Gouget",
        "Florian Farris",
        "Said Zenafi",
        "Yannis Aouachria",
        "Pierre Denaes",
        "Morgan Trainoir",
        "Coralie Damery",
        "Quentin Robert",
        "Alexandre Chauvet",
        "Sebastien Cartoux",
        "Davis Haas",
        "Sofiane Sotehi",
        "Yoan Baldacchino",
        "Nicolas Degabriel",
        "Ayman Bratzu",
        "Quentin Queffuris",
        "Killian Pasquier",
        "Jérôme Laurent",
        "Jean-Daniel Pontremoli",
        "Marjorie Ngoupende",
        "Christophe Coutures",
        "Michel Christophe",
        "Cooper Hadley",
        "Thaddeus Blackwell",
        "Brent Robledo",
        "Wilfredo Granados",
        "Brennan Sanford",
        "Penelope Morgan",
        "Nathaniel Collins",
        "Braden Baumgartner",
        "Markus Donohue",
        "Mekhi Brennan",
        "Payne Levine",
        "Ira Grissom",
        "Camron Chamberlin",
        "Oliver Swope",
        "Estrella Logan",
        "Deon Ogle",
        "Raquel Zeller",
        "Jaqueline Lerma",
        "Virginia Groves",
        "Leonel Whitehead"
    ];
    const getRandomNumber = max => Math.floor(Math.random() * max);
    const name = `${group[getRandomNumber(group.length)]}`;

    // console.log("email: " + email);

    const [text, settext] = useState("");
    const [image, setimage] = useState
        (`https://i.pravatar.cc/150?u=${name}`);
    let likes = [];

    const fetchHandler = async () => {
        let data = await axios.get(URL).then((res) => res.data);

        return data;
    };

    useEffect(() => {
        fetchHandler().then((data) => {
            dispatch({
                type: "addcomment",
                payload: data.comment,
            });
        });
    }, [dispatch]);

    const changetext = (event) => {
        settext(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault();
        // console.log("HELLO");
        if (text) {
            await sendRequest();
            await fetchHandler().then((data) => {
                // dispatch(AddComment());
                dispatch({
                    type: "addcomment",
                    payload: data.comment,
                });
            });
        } else {
            toast.error("Text Cannot Be Empty", {
                position: "top-right"
            });
            // alert("Text cannot be empty");
        }
        settext("");
    };

    const handleClickLike = async (event) => {
        let found = false;
        for (let i = 0; i < event.likes.length; i++) {
            if (event.likes[i] === email) {
                found = true;
                let s = event.likes.length - 1;
                let temp = event.likes[s];
                event.likes[s] = event.likes[i];
                event.likes[i] = temp;

                break;
            }
        }
        if (found === false) {
            event.likes.push(email);
            // console.log(event.likes);
        } else {
            event.likes.pop();
        }

        await sendRequestUpdate(event);
        fetchHandler().then((data) => {
            dispatch({
                type: "addcomment",
                payload: data.comment,
            });
        });
    };

    const sendRequestUpdate = async (event) => {
        // console.log(event.id);
        let updateURL = `/updatelikes/${event.id}/`;

        await axios.put(updateURL, {
            text: String(event.text),
            name: String(event.name),
            date: String(event.date),
            image: String(event.image),
            likes: event.likes,
        });
    };

    const sendRequest = async () => {
        const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const nowDate = new Date();
        // console.log(longEnUSFormatter.format(nowDate));
        await axios.post(addURL, {
            text: String(text),
            name: String(name),
            date: String(longEnUSFormatter.format(nowDate)),
            image: String(image),
            // likes: Array(),
        });
    };

    function Card(props) {
        return (

            <div className="mt-2" style={{ backgroundColor: '#fe010052', color: '#fff', borderRadius: '7px', margin: '0.5em', padding: '0.8em', color: '#1c1c1c' }}>
                <div className="d-flex flex-row p-3 ">
                    <div className="w-100">
                        <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            alignContent: "center",
                            margin: "2%"
                        }}>
                            <div>
                                <img
                                    src={props.image}
                                    width="40"
                                    height="40"
                                    className="rounded-circle mr-3 image"
                                    style={{ borderRadius: "32px", }}
                                />
                                <div className="d-flex flex-row align-items-center">
                                    <h4 className="mr-2">{props.name}</h4>
                                </div>
                            </div>
                            <small>{props.date}</small>
                        </div>
                        <p className="text-justify comment-text mb-0">{props.text}</p>
                        <div className="d-flex flex-row user-feed" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginLeft: "300px" }}>
                            <span className="wish" >
                                <FavoriteBorderIcon onClick={() => handleClickLike(props)} />
                                {props.likes.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <>
            <Navbar />
            <div className="container c2 mb-5 ">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="p-3">
                                <h4 style={{ color: '#1c1c1c', fontSize: '250%' }}> Fitness Community</h4>
                                <div >
                                    <div className="mt-3 d-flex flex-row align-items-center p-3 form-color Cummunity_input">
                                        {" "}
                                        <img
                                            src={image}
                                            width="50"
                                            style={{ borderRadius: "32px" }}
                                            className="rounded-circle mr-2 image"
                                        />{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ width: "100%", border: "1px solid #fe0100", margin: "1%" }}
                                            placeholder="Enter your comment..."
                                            value={text}
                                            onChange={changetext}
                                        />
                                        <button onClick={handleClick} className="CButton c-badge"

                                        // style={{ width: "10%", border: "0px solid" }}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>

                                {comment.map((element, i) => {
                                    return (
                                        < Card key={i}
                                            date={element.date}
                                            text={element.text}
                                            name={element.name}
                                            image={element.image}
                                            likes={element.likes}
                                            id={element._id}
                                        />
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Discuss;
