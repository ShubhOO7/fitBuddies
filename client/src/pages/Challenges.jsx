import "../Css/challenges.css"
import { useEffect, useState } from "react";
import image1 from '../Assets/arms-and-abs-challenge.jpg'
import image2 from '../Assets/before-breakfast-cardio-challenge.jpg'
import image3 from '../Assets/better-arms-challenge.jpg'
import image4 from '../Assets/better-legs-challenge.jpg'
import image5 from '../Assets/daily-cardio-challenge.jpg'
import image6 from '../Assets/daily-kicks-challenge.jpg'
import image7 from '../Assets/first-thing-pushups-challenge.jpg'
import image8 from '../Assets/flex-hang-challenge.jpg'
import image9 from '../Assets/guardian-challenge.jpg'
import image10 from '../Assets/level-up-challenge.jpg'
import image11 from '../Assets/ninja-challenge.jpg'
import image12 from '../Assets/power-punch-challenge.jpg'
import image13 from '../Assets/squat-hero-challenge.jpg'
import image14 from '../Assets/step-up-challenge.jpg'
import image15 from '../Assets/touch-your-toes-challenge.jpg'
import image16 from '../Assets/tricep-dips-challenge.jpg'
import image17 from '../Assets/walking-challenge.jpg'
import image18 from '../Assets/warrior-abs-challenge.jpg'
import image19 from '../Assets/push-and-pull-challenge.jpg'
import image20 from '../Assets/warrior-arms-challenge.jpg'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router";


//IMAGE ARRAY
const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20];

function challenges() {

    return (
        <>
            <Navbar />
            <div className="App" style={{ marginTop: "10vh" }}>
                <ImageGallery />
            </div>
        </>

    );
}

function ImageGallery() {
    const [imageToShow, setImageToShow] = useState("");
    const [lightboxDisplay, setLightBoxDisplay] = useState(false);

    const imageCards = images.map((image) => (
        <img className="image-card" onClick={() => showImage(image)} src={image} />
    ));

    const showImage = (image) => {
        setImageToShow(image);
        setLightBoxDisplay(true);
    };

    const hideLightBox = () => {
        setLightBoxDisplay(false);
    };

    const showNext = (e) => {
        e.stopPropagation();
        let currentIndex = images.indexOf(imageToShow);
        if (currentIndex >= images.length - 1) {
            setLightBoxDisplay(false);
        } else {
            let nextImage = images[currentIndex + 1];
            setImageToShow(nextImage);
        }
    };

    const showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = images.indexOf(imageToShow);
        if (currentIndex <= 0) {
            setLightBoxDisplay(false);
        } else {
            let nextImage = images[currentIndex - 1];
            setImageToShow(nextImage);
        }
    };


    return (
        <>
            <div >{imageCards}</div>

            {
                lightboxDisplay ?
                    <div id="lightbox" onClick={hideLightBox} style={{ marginTop: "6vh" }}>
                        <button onClick={showPrev}>⭠</button>
                        <img id="lightbox-img" src={imageToShow} ></img>
                        <button onClick={showNext}>⭢</button>
                    </div>
                    : ""
            }
        </>
    );
}

export default challenges;
