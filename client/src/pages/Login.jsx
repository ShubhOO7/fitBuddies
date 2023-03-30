
import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "../Css/mix.css";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    const [passShow, setPassShow] = useState(false);

    const dispatch = useDispatch();

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("Email is required!", {
                position: "top-right"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-right"
            });
        } else if (password === "") {
            toast.error("Password is required!", {
                position: "top-right"
            });
        } else if (password.length < 6) {
            toast.error("Password must be 6 char!", {
                position: "top-right"
            });
        } else {
            // console.log("user login succesfully done");


            const data = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            // console.log(res);
            if (res.status === 422) {
                toast.error(res.error, {
                    position: "top-right"
                });
            }

            if (res.status === 201) {
                // console.log(res);
                // console.log(res.result.token);
                localStorage.setItem("usersdatatoken", res.result.token);
                setInpval({ ...inpval, email: "", password: "" });
                dispatch({
                    type: "signin",
                    payload: email
                })
                navigate("/home");
            }
        }
    }

    return (
        <>
            <div className="sec">
                <div className="form_data">
                    <div className="form_heading"  >
                        <h1>Welcome Back, <span style={{ color: 'red !important' }}>Log In</span></h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email" style={{ textAlign: 'left' }}>Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input" style={{ alignText: 'left' }}>
                            <label htmlFor="password"  >Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/">Sign Up</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Login