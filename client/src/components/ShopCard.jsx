import React from 'react'
import { Button, Card, Typography } from '@mui/material';
import "../Css/shop.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addURL = "/addToCart/";

function Book(books) {
    const { id, count, name, description, price, img, link } = books.book;
    // const data = { id, count, name, description, price, img };
    // console.log("data ");
    // console.log(books.book);

    // const { email } = useSelector((state) => state.UpdateUser);
    const EmailUsed = "abc@gmail.com";

    // console.log(email);

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        const data = await fetch(addURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, count, name, description, price, img, link, EmailUsed })
        })
        const res = await data.json();
        // console.log(res);
        if (res.status === 422) {
            toast.error(res.error, {
                position: "top-right"
            });
        }
        dispatch({
            type: "addproduct",
            payload: {
                "count": 1, "link": link, name, "description": description,
                "id": id, "count": count, "price": price, "image": img
            }
        });
    }
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: "#f60c0703" }} className='deck'>
            <img src={img} alt={name} className='imageCard' />
            <Typography variant="h6">
                {name}
            </Typography>

            <Typography
                variant="body2" color="text.secondary"
                className='descriptionCard'>
                {description}
            </Typography >
            <Typography variant="h5" style={{ color: 'rgb(254 16 0 / 68%)' }}>Rs : {price}</Typography>
            <Typography style={{ margin: "5%" }} >
                <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    sx={{ mt: "auto" }}
                    style={{ margin: "2px", color: "rgb(254 16 0 / 68%)", borderColor: "rgb(254 16 0 / 68%)" }}
                    startIcon={<DeleteIcon />}>
                    ADD TO CART
                </Button>
            </Typography>

        </Card>
    )
}

export default Book