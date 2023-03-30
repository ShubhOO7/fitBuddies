import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShopCard from '../components/ShopCard';
import "../Css/shop.css";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom"

const URL = "/books";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};
const books = [
    {
        id: 110,
        name: ' Yoga Mats ',
        description: 'Boldfit Yoga Mats For Women yoga mat for men Exercise mat for home workout yoga mat for women gym mat Anti Slip Yoga mat Workout mat Yoga Mat For Kids Yoga mate gym mats for workout at home',
        price: 450,
        link: "https://www.amazon.in/Boldfit-Women-Exercise-workout-Workout/dp/B0BD5FST2B/ref=sr_1_5?crid=Y0U3HDKH670H&keywords=yoga+mats&qid=1680112444&sprefix=yo%2Caps%2C256&sr=8-5",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81qhmZ4xXRL._SX679_.jpg',
    }, {
        id: 1,
        name: 'Bodyband Hand Grip',
        description: 'Bodyband Hand Grip Workout Strengthener, Adjustable Hand Gripper for Men & Women for Gym Workout Hand Exercise Equipment to Use in Home for Forearm Exercise',
        price: 250,
        count: 0,
        link: "https://www.amazon.in/Bodyband-Strengthener-Adjustable-Equipment-Black-Orange/dp/B0BKZK9JGB/ref=sr_1_11?crid=2K5ZQEF9EHZAX&keywords=fitness+accessories&qid=1680112698&sprefix=fitness+acc%2Caps%2C255&sr=8-11",
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51df0s6DzmL._SX679_.jpg',
    }, {
        id: 2,
        name: 'Resistance Tube',
        description: 'Double Toning Resistance Tube Pull Rope Elastic Rubber Exercise Band for Stretching, Workout, Home Gym and Toning with Heavy Quality D Shaped Handles with Workout Chart',
        price: 599,
        link: "https://www.amazon.in/DAZIBAO%C2%AE-Resistance-Quality-Exercise-Stretching/dp/B08QGTY9XP/ref=sr_1_2_sspa?crid=2K5ZQEF9EHZAX&keywords=fitness+accessories&qid=1680112698&sprefix=fitness+acc%2Caps%2C255&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/6135mcd9ZcL._SX679_.jpg',
    }, {
        id: 3,
        name: 'Workout Bar',
        description: 'Joyfit Home Exercise Workout Bar|Door Safety Cap With Perfect Door Frame Fit|Chin up Bar with Easy Installation| Long Foam Grips for Upper & Lower Body Exercises for Men & Women',
        price: 1599,
        link: "https://www.amazon.in/Exercise-Workout-Perfect-Installation-Exercises/dp/B0867JRTKQ/ref=sr_1_4_sspa?crid=2K5ZQEF9EHZAX&keywords=fitness+accessories&qid=1680112698&sprefix=fitness+acc%2Caps%2C255&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61HFBR07csL._SX679_.jpg',
    }, {
        id: 4,
        name: 'Mounting Pull up Bar',
        description: 'ALLYSON FITNESS Wall Mounting Pull up Bar - Chin Up Bar Solid Fitness with Ab Straps Combo Accessory for Home Gym. ',
        price: 1699,
        link: "https://www.amazon.in/ALLYSON-FITNESS-Wall-Mounting-Pull/dp/B08HJH8WMJ/ref=sr_1_38?crid=2K5ZQEF9EHZAX&keywords=fitness+accessories&qid=1680112698&sprefix=fitness+acc%2Caps%2C255&sr=8-38",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61-x9ItYw0L._SX679_.jpg',
    }, {
        id: 5,
        name: 'Bench for Strength Training',
        description: 'ALLYSON FITNESS Adjustable Incline, Decline and Flat Bench for Weight Strength Training, Sit Up - Weight Capacity 350 Kg (Black)',
        link: "https://www.amazon.in/ALLYSON-Adjustable-Strength-Training-Fitness/dp/B08F7XK3LV/ref=sr_1_43?crid=2K5ZQEF9EHZAX&keywords=fitness+accessories&qid=1680112698&sprefix=fitness+acc%2Caps%2C255&sr=8-43",
        price: 4999,
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51z6pbn27sL._SX679_.jpg',
    }, {
        id: 6,
        name: 'Fat Trimmer/Burner Belt',
        description: 'SONAJURI ARTS Sports Art ® Sweat Slimming/Waist/Fat Trimmer/Burner Belt for Men, Women and Unisex | Free Size | 2 Years Warranty | Used in Work from Home, Gym, Intense Workout Black',
        link: "https://www.amazon.in/SONAJURI-ARTS-Slimming-Trimmer-Warranty/dp/B0BS5M357J/ref=sr_1_21_sspa?crid=28M5JJRSCFEPN&keywords=fitness+accessories+for+women&qid=1680113031&sprefix=fitness+accessories+fo%2Caps%2C718&sr=8-21-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1",
        price: 549,
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51ZqIPASNkL._UX679_.jpg',
    }, {
        id: 7,
        name: 'Gym Bags',
        description: 'Strauss Jacquard Gym Bags, Blocks Design, (Black/Cream).A Jacquard gym bag is the perfect solution for carrying all of your workout essentials to and from the gym. ',
        price: 299,
        link: "https://www.amazon.in/Strauss-Jacquard-Blocks-Design-Black/dp/B0BTP4DGQ1/ref=sr_1_1_sspa?crid=28M5JJRSCFEPN&keywords=fitness%2Baccessories%2Bfor%2Bwomen&qid=1680113031&sprefix=fitness%2Baccessories%2Bfo%2Caps%2C718&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81-dvbvXJEL._SX679_.jpg',
    }, {
        id: 8,
        name: 'Home Gym Equipments ',
        description: 'PASCAL Home Gym Equipments for Men, [8-100Kg], One Curl Rod, One Straight Rod+ One Pair Dumbbell Rods,Fitness Bench, PVC Dumbbell Plates, Exercise Set, Home Gym Kit',
        price: 2799,
        link: "https://www.amazon.in/PASCAL-Equipments-Straight-Dumbbell-Fitness/dp/B09746F1XQ/ref=sr_1_2_sspa?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/518Z5OOeU8L.jpg',
    },
    {
        id: 9,
        name: 'Push Up Board',
        description: 'W0W FITNESS WORLD Push Up Board ,15 in 1 multipurpose Pushup board for men & women, Foldable Pushup board & push up bar l body building push-up exercise board l chest & calisthenics workout equipment bar portable home gym (15 IN 1 PUSH-UP BOARD)',
        price: 999,
        link: "https://www.amazon.in/Wow-foldable-building-calisthenics-equipment/dp/B09NLT9728/ref=sr_1_1_sspa?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81HxnlrlPiL._SX679_.jpg',
    },
    {
        id: 10,
        name: 'Leather Gym Gloves',
        description: 'Kobo WTG-05 Leather Gym Gloves, Medium (Black).Leather Front PalmPadded Front Palm . Soft Material Back Hand for Sweat Ventilation. Spandex at back for comfortable fitting .Comfortable',
        price: 449,
        link: "https://www.amazon.in/Kobo-WTG-05-Leather-Gloves-Medium/dp/B010SGKT60/ref=sr_1_47?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-47",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51BipDnNkrL.jpg',
    },
    {
        id: 11,
        name: 'Hex Dumbbells ',
        description: 'Lifelong PVC Hex Dumbbells Pack of 2 (2kg-10kg) for Home Gym Equipment Fitness Barbell|Gym Exercise|Home Workout, Gym Dumbbells|Dumbbells Weights for Men & Women (6 Months Warranty)',
        price: 199,
        link: "https://www.amazon.in/Lifelong-Dumbbells-Equipment-Exercise-Warranty/dp/B09W5F6KGB/ref=sr_1_41?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-41",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/710SxepIfiL._SX679_.jpg',
    },
    {
        id: 12,
        name: ' Triceps Exercise Equipment Rope Bar',
        description: 'Gym Accessories for Men Triceps Exercise Equipment Rope Bar Workout Handles | Biceps Bench Press | Black Color Rope of 28 MM Diameter Making A Perfect Grip',
        price: 149,
        link: "https://www.amazon.in/Accessories-Triceps-Exercise-Equipment-Diameter/dp/B08PVZZPCX/ref=sr_1_30?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-30",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61HdarDlNzL._SX679_.jpg',
    },
    {
        id: 13,
        name: 'Ab Roller/Indoor',
        description: 'PRO365 Home Gym Ab Roller/Indoor Ab Wheel for Abs Workouts 6 Month Warranty/Dual Abdominal Exercise/Core Workouts for Men and Women (6 MM Safe Knee Mat, Yellow Roller)',
        price: 299,
        link: "https://www.amazon.in/PRO365-Double-Roller-Abdominal-Workout/dp/B07PP3LCLN/ref=sr_1_20?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-20",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61ZBPiOp3sL._SX679_.jpg',
    },
    {
        id: 14,
        name: 'Spandex Mens ',
        description: 'Unbeatable Polyester Spandex Mens Sports Running Set Compression Shirt + Pants Skin - Tight Long Sleeves Quick Dry Fitness Tracksuit Gym Yoga Suits',
        price: 499,
        link: "https://www.amazon.in/Unbeatable-Polyester-Compression-Skin-Tight-Tracksuit/dp/B09ZLBKR1C/ref=sr_1_12?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-12",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/41ySXF78faL._UX679_.jpg',
    },
    {
        id: 15,
        name: 'Plastic snap',
        description: 'Discraft 175 gram ton / 25% Polyester / 28% Nylon, contrast trucker mesh back, matching plastic snap, hard buckram, matching undervisor. One s Ultrastar disc, hot stamped with the original VC logo.',
        price: 299,
        link: "https://www.amazon.in/SKULLFIT-Sports-Headbands-Men-Black/dp/B08QGP3JVV/ref=sr_1_18?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-18",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61-n+ddVIHL._SX679_.jpg',
    },
    {
        id: 16,
        name: 'Push-up Assistant ',
        description: 'Jukusa Situp and Push-up Assistant Home Fitness Gym Equipment Multipurpose Exercise Tool for Women & Men, 4 Stage arm Leg Chest Exercise With Suction for Lose Weight (Black Color)',
        price: 699,
        link: "https://www.amazon.in/Jukusa-Multipurpose-Assistant-Equipment-Multicolor/dp/B091YJR3HN/ref=sr_1_51?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113087&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-51",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61nX-qFqz7L._UX679_.jpg',
    },
    {
        id: 17,
        name: 'Gym Bag-4',
        description: 'NIVIA Beast Gym Bag-4 Polyester/Unisex Gym Bags/Shoulder Bag for Men & Women with Separate Shoes Compartment/Carry Gym Accessories/Fitness Bag/Sports & Travel Bag/Sports Kit',
        price: 499,
        link: "https://www.amazon.in/Nivia-Beast-Gym-Green-Grey/dp/B078PJH887/ref=sr_1_49?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113388&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-49",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81ihtn0uwiL._SX679_.jpg',
    },
    {
        id: 18,
        name: 'Hair Band For Women',
        description: 'Boldfit Hair Band For Women For Men Headband For Gym Gym Accessories For Men For Women Fitness Band Hair Accessories Hair Band Stylish Fitness Band Head Wear For Gym Gym Band - Black - Pack of 3',
        price: 399,
        link: "https://www.amazon.in/Boldfit-Headband-Accessories-Fitness-Stylish/dp/B0BRZQBJQ9/ref=sr_1_51?crid=3QEUDWBWZP3HT&keywords=fitness+accessories+for+men&qid=1680113388&sprefix=fitness+accessories+for+men%2Caps%2C250&sr=8-51",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61sdHI0UUvL._SX679_PIbundle-3,TopRight,0,0_AA679SH20_.jpg',
    },
    {
        id: 19,
        name: 'Strauss Yoga Wheel',
        description: 'IMPROVE YOUR YOGA - This Unique Yoga Wheel Will Help You Improve Your Flexibility And Balance And Be Able To Execute Any Pose Perfectly! The Yoga Prop Is Ideal For Backends So You Can Stretch Your Back Go Deeper Into Spinal Stretch And Relieve Any Backache',
        price: 999,
        link: "https://www.amazon.in/STRAUSS-ST-1459-Strauss-Wheel-Purple/dp/B07QFVTZJX/ref=sr_1_7?crid=1AYT52SPVIV7X&keywords=yoga%2Baccessories&qid=1680113426&sprefix=yoga%2Bacces%2Caps%2C258&sr=8-7&th=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71XsrOLUQqL._SX679_.jpg',
    },
    {
        id: 20,
        name: 'Vegan Plant Protein',
        description: 'Nutrabay Wellness Vegan Plant Protein (24g Vegan Protein - Pea & Brown Rice Protein) with Vitamins Minerals - Post Workout Drink for Muscle Growth, Gym Supplement for Men & Women -1 kg Rich Chocolate',
        price: 1799,
        link: "https://www.amazon.in/Nutrabay-Wellness-Protein-Powder-Superfoods/dp/B097T2RNPD/ref=sr_1_3_sspa?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71OnVy3CbvL._SY879_.jpg',
    },
    {
        id: 21,
        name: 'Multivitamin',
        description: 'Centrum Adult 50+, Worlds No.1 Multivitamin with Calcium, Vitamin D3 & 21 other Nutrients for Overall Health, Strong Joints & Heart Health (Veg) 50 Tablets',
        price: 679,
        link: "https://www.amazon.in/Centrum-Multivitamin-Calcium-Vitamin-Nutrients/dp/B0BD1RTMWR/ref=sr_1_1_sspa?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51G7-gPGtML._SX679_PIbundle-50,TopRight,0,0_AA679SH20_.jpg',
    },
    {
        id: 22,
        name: 'Whey Protein Concentrate',
        description: 'Nutrabay Pure 100% Raw Whey Protein Concentrate - 500g, Unflavoured - 16 Servings | 23.4g Protein, 5.3g BCAA, 3.9g Glutamic Acid| Muscle Growth & Recovery | Gym Supplement for Men & Women',
        price: 999,
        link: "https://www.amazon.in/Nutrabay-Whey-Protein-Concentrate-Unflavoured/dp/B07T2KB36G/ref=sr_1_4_sspa?crid=T6TAXYIFX5IB&keywords=supplement%2Bfor%2Bgym&qid=1680113465&sprefix=suppliement%2Bfor%2Bgym%2Caps%2C241&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51JTcgr+oCL._SX679_.jpg',
    },
    {
        id: 23,
        name: 'Multivitamin For Men ',
        description: 'Revital H Multivitamin For Men (60 Capsules) With Natural Ginseng, Zinc, 10 Vitamins & 8 Minerals For Daily Energy, Stamina & Immunity',
        price: 500,
        link: "https://www.amazon.in/Revital-8-9013E-12-H-Capsules/dp/B006QQQTHU/ref=sr_1_2_sspa?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61fLF79hHCL._SX679_.jpg',
    },
    {
        id: 24,
        name: 'Mass Gainer',
        description: 'Bigmuscles Nutrition Real Mass Gainer [3Kg, Chocolate] | Lean Whey Protein Muscle Mass Gainer | Complex Carbohydrates, | 1000 Calories | Reduces Muscle Breakdown | Boosts Metabolism',
        price: 1999,
        link: "https://www.amazon.in/Bigmuscles-Nutrition-Chocolate-Carbohydrates-Calories/dp/B07YNL38ZY/ref=sr_1_9?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-9",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71zXJioptHL._SX679_.jpg',
    },
    {
        id: 25,
        name: ' L-Arginine PMP Powder',
        description: 'Bigmuscles Nutrition L-Arginine PMP Powder for Adults [90 gm, 30 Serving, Blueberry] 3000 mg | Muscle Building Amino Acid | Build Strength & Endurance|Reduce Fatigue |Enhance Energy Levels | Preworkout',
        price: 575,
        link: "https://www.amazon.in/Bigmuscles-Nutrition-L-Arginine-Blueberry-Preworkout/dp/B08R6PC1HM/ref=sr_1_11?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-11",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71QE6tlbjcL._SX679_.jpg',
    },
    {
        id: 26,
        name: 'Testosterone Booster',
        description: 'Humming Herbs Ultra Testosterone Booster Supplement For Men (8040mg) | 90 Capsules | Boost Muscle Growth, Energy and Performance Support',
        price: 777,
        link: "https://www.amazon.in/Humming-Herbs-Testosterone-Supplement-Performance/dp/B0BM644BDP/ref=sr_1_14?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-14",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71192rbrHRL._SX679_.jpg',
    },
    {
        id: 27,
        name: 'BCAA Supplement Powder',
        description: 'Fast&Up BCAA Basic (45 Servings, Watermelon Flavour) BCAA Supplement Powder with 2:1:1 Ideal Ratio Leucine, Isoleucine & Valine - Pre/Post & Intra Workout Supplement For Recovery & Performance Boost',
        price: 899,
        link: "https://www.amazon.in/Essentials-Servings-Watermelon-Flavour-Supplement/dp/B08XKDZ277/ref=sr_1_15?crid=T6TAXYIFX5IB&keywords=supplement+for+gym&qid=1680113465&sprefix=suppliement+for+gym%2Caps%2C241&sr=8-15",
        count: 0,
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/61XtVX0PJcL._SX679_.jpg',
    },

];

function BookList() {
    const navigate = useNavigate();
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
    return (
        <>
            <Navbar />
            <div className="shopBody">

                <ul className='ProductList'>
                    {books && books.map((book, index) => (
                        <div className='book' key={index}>
                            <ShopCard book={book} />
                        </div>
                    ))}
                </ul>
            </div>
        </>

    )
}

export default BookList