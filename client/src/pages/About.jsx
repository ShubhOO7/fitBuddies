import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import "../Css/about.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

function About() {
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
            // console.log(data);s
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
            <div className="feat bg-gray pt-5 pb-5 ddfa" style={{ marginTop: "7%" }}>
                <div className="containerAbout" >
                    <div className="rowAbout">
                        <div className="section-head col-sm-12" style={{ textAlign: "center" }}>
                            <h4><span>Why Choose</span> Us?</h4  >
                            <p style={{ width: "70%", margin: "auto" }}>When you choose us, you'll feel the benefit of 10 years' experience of Fitness Training. Because we know the Fitness world and we know that how to handle all aspects of health, fitness and exercise. With working knowledge of online, and you we can acheive greater fitness and healthy life.</p>
                        </div>
                        <div className="manage">
                            <div className="col-lg-4 col-sm-6">
                                <div className="item"> <span className="icon feature_box_col_one">
                                    <MedicationLiquidIcon style={{ width: '50%', height: '100%' }} /></span>
                                    <h6>Healthy LifeStyle</h6>
                                    <p style={{ width: "70%", margin: "auto" }}>A healthy lifestyle involves making choices that promote physical, mental, and emotional well-being. Physical activity helps to maintain a healthy weight, reduces the risk of chronic diseases, and improves overall physical and mental health. Aim for at least 150 minutes of moderate-intensity physical activity per week. A balanced diet that includes a variety of nutrient-dense foods such as fruits, vegetables, whole grains, lean proteins, and healthy fats provides the body with the nutrients it needs to function properly.</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="item">

                                    <span className="icon feature_box_col_two">
                                        <FitnessCenterIcon style={{ width: '50%', height: '100%' }} />

                                    </span>
                                    <h6>Personal Trainer</h6>
                                    <p style={{ width: "70%", margin: "auto" }}>There are so many reasons why a personal trainer is essential to achieving your fitness goals, whether they be weight loss-based, sports-driven or for athletic purposes. Here, we’ve put together the most critical reasons why you should have a personal trainer, as well as the benefits that you are likely to achieve by working with one</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-sm-6">
                                <div className="item"> <span className="icon feature_box_col_four">
                                    <DirectionsRunIcon style={{ width: '50%', height: '100%' }} />

                                </span>
                                    <h6>Personal Growth</h6>
                                    <p style={{ width: "70%", margin: "auto" }}>Everyone wants to live on top of the mountain, but all the happiness and growth occurs while you're climbing it.The quality of care provided by a healthcare provider is important. It is important to choose a healthcare provider who has a good reputation, is knowledgeable, and provides high-quality care.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-sm-6">
                                <div className="item"> <span className="icon feature_box_col_six">
                                    <CurrencyRupeeIcon style={{ width: '50%', height: '100%' }} />
                                </span>
                                    <h6>Affordable cost</h6>
                                    <p style={{ width: "70%", margin: "auto" }}>Love is a special word, and I use it only when I mean it. You say the word too much and it becomes cheap.The cost of healthcare services can vary widely. It is important to consider the cost of the services you need and whether they are covered by your insurance.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="item"> <span className="icon feature_box_col_three">


                                    <LiveHelpIcon style={{ width: '50%', height: '100%' }} />
                                </span>
                                    <h6>24 x 7 User Support</h6>
                                    <p style={{ width: "70%", margin: "auto" }} s>If our customer has any problem and any query we are always happy to help then. The availability of healthcare services is important. You may need to choose a healthcare provider who is available when you need them, especially for urgent medical issues.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About