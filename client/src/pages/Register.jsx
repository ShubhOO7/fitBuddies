

import React, { useState } from 'react'
// import { NavLink  } from "react-router-dom"
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Css/mix.css";

const Register = () => {
    const navigate = useNavigate();

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });


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

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            toast.warning("Name is required!", {
                position: "top-right"
            });
        } else if (email === "") {
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
        } else if (cpassword === "") {
            toast.error("Confirm Password is required!", {
                position: "top-right"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("Confirm Password must be 6 char!", {
                position: "top-right"
            });
        } else if (password !== cpassword) {
            toast.error("Passwords are not matching!", {
                position: "top-right"
            });
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
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
                toast.success("Registration Successfully done 😃!", {
                    position: "top-right"
                });
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
                navigate('/login');
            }
        }
    }

    return (
        <>
            <div className="sec">
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you aligned towards fitness <br />
                            We hope that you will do it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to='/login'>Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Register