import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import "../Css/home.css"
import Footer from '../components/Footer';
function Home() {
    const navigate = useNavigate();

    const ValidUser = async () => {

        let token = localStorage.getItem("usersdatatoken");
        // console.log(token);
        const res = await fetch("http://localhost:8000/validateUser", {
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

    return (
        <>
            <Navbar />
            <div className="BODY_Home">

                <div className="main">
                    <div className="container">
                        <h1 className='H1HOME'>Move</h1>
                        <p>Form healthy habits to take your fitness to the next level.</p>
                        <a href="/challenges" className="btnH" style={{ borderRadius: '5px' }}>Start Now</a>
                    </div>
                </div>

                <div className="supporting">
                    <div className="container">
                        <div className="col">
                            <h2>Move</h2>
                            <p>Become more active by tracking your runs, rides, and walks.</p>
                        </div>
                        <div className="col">
                            <h2>Sync</h2>
                            <p>Access your activity on your phone, tablet, or computer.</p>
                        </div>
                        <div className="col">
                            <h2>Compete</h2>
                            <p>Set personal challenges and see how you rank against your friends.</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>


                <div className="feature">
                    <div className="container">
                        <h2>Move. Rest. Recover. Move.</h2>
                    </div>
                </div>
                <div className="supporting">
                    <div className="card-containerHome">
                        {/* <div class="cardHome" id="card1Home">
                            <div class="linkHome">
                                <span class="">
                                    <a href="">link</a>
                                </span>
                            </div>
                        </div> */}
                        <div className="cardHome">
                            <div className="card-contentHome">
                                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81qhmZ4xXRL._SX679_.jpg" alt="" />
                            </div>
                        </div>
                        <div className="cardHome">
                            <div className="card-contentHome">
                                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51ZqIPASNkL._UX679_.jpg" alt="" />

                            </div>
                        </div>
                        <div className="cardHome">
                            <div className="card-contentHome">
                                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81ihtn0uwiL._SX679_.jpg" alt="" />

                            </div>
                        </div>

                        <div className="cardHome">
                            <div className="card-contentHome">
                                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61HFBR07csL._SX679_.jpg" alt="" />

                            </div>
                        </div>
                        <div className="cardHome">
                            <div className="card-contentHome">
                                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71QE6tlbjcL._SX679_.jpg" alt="" />

                            </div>
                        </div>
                        <div className="cardHome">
                            <div className="card-contentHome">
                                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/518Z5OOeU8L.jpg" alt="" />

                            </div>
                        </div>

                    </div>
                    <a href="/shop" className="btnH" style={{ borderRadius: '5px', marginTop: '8%' }}>Shop Now</a>
                </div>
                <div className="footer">
                    <div className="container">
                        <h2>Stop scrolling. Start moving</h2>
                        <a href="/challenges" className="btnH" style={{ borderRadius: '5px' }}>Start Now</a>
                    </div>
                </div>
                <div className="supporting">

                </div>
            </div>
            <Footer />
        </>

    )
}

export default Home


