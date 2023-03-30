import React, { useEffect, useState } from 'react'
import "../Css/cart.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Logo from '../Assets/FitLogo.png';

// /Users/shubhamkanojia/VS-CODE/Project_774/client/src/Css/cart.css
import { useNavigate, NavLink } from 'react-router-dom';

function Cart() {
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
    const { comment, email } = useSelector((state) => state.UpdateUser);
    const EmailUsed = email;
    const NameUsed = "Shubham";
    const AddressUsed = "NIT Jamshedpur";
    // const checkoutHandler = async (amount) => {

    //     const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

    //     const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
    //         amount
    //     })

    //     const options = {
    //         key,
    //         amount: order.amount,
    //         currency: "INR",
    //         name: "6 Pack Programmer",
    //         description: "Tutorial of RazorPay",
    //         image: "https://avatars.githubusercontent.com/u/25058652?v=4",
    //         order_id: order.id,
    //         callback_url: "http://localhost:4000/api/paymentverification",
    //         prefill: {
    //             name: "Gaurav Kumar",
    //             email: "gaurav.kumar@example.com",
    //             contact: "9999999999"
    //         },
    //         notes: {
    //             "address": "Razorpay Corporate Office"
    //         },
    //         theme: {
    //             "color": "#121212"
    //         }
    //     };
    //     const razor = new window.Razorpay(options);
    //     razor.open();
    // }
    const [payment, setPayment] = useState(false);

    const handleSubmit = async function () {
        console.log(products);
        let amt = 50;
        products.forEach(element => {
            // console.log(element);
            amt = amt + (element.price * element.quantity);
        });
        // console.log(amt);
        const { data: { key } } = await axios.get("/payment/getkey/");

        const { data: { order } } = await axios.post("/payment/checkout/", { amt });
        // console.log(key);
        // console.log(order.amount);
        // console.log(order.id);
        // console.log(window);
        let paymentId, orderId, signatureId;
        var options = {
            "key": key,
            "amount": amt,
            "currency": "INR",
            "name": "FitBuddies",
            "description": "Paying to fit-buddies",
            "image": Logo,
            "order_id": order.id,
            "handler": function (response) {
                paymentId = response.razorpay_payment_id;
                orderId = response.razorpay_order_id;
                signatureId = response.razorpay_signature;
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);


                const data1 =
                    axios.post("/payment/paymentverification/", { paymentId, orderId, signatureId });

                const data2 = fetch("/deleteCart/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ EmailUsed })
                }).then(response => response.json())
                    .then(result => {
                        // console.log(result);
                    });
                const data3 = axios.post("/payment/createorder/", {
                    products, orderId, EmailUsed, NameUsed, AddressUsed
                });

                toast.success("Payment successful ", {
                    position: "top-right"
                });
                setTimeout(() => {
                    navigate('/success');
                }, 2000);

            },
            "prefill": {
                "name": NameUsed,
                "email": EmailUsed,
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            toast.error("Payment Unsuccessful try again!", {
                position: "top-right"
            });
        });
        rzp1.open();
    };



    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        getCart();
    }, []);
    const PROMOTIONS = [
        {
            code: "SUMMER",
            discount: "50%"
        },
        {
            code: "AUTUMN",
            discount: "40%"
        },
        {
            code: "WINTER",
            discount: "30%"
        }
    ];
    let PRODUCTS = [
        // {
        //     id: 0,
        //     image: "https://via.placeholder.com/200x150",
        //     name: "PRODUCT ITEM NUMBER 1",
        //     description: "Description for product item number 1",
        //     price: 599,
        //     count: 2990,
        //     email: ""
        // },
        // {
        //     id: 2,
        //     image: "https://via.placeholder.com/200x150",
        //     name: "PRODUCT ITEM NUMBER 2",
        //     description: "Description for product item number 1",
        //     price: 999,
        //     count: 3,
        //     email: ""
        // }
    ];
    function formatCurrency(value) {
        return Number(value).toLocaleString("en-US", {
            style: "currency",
            currency: "INR"
        });
    }

    // const { image, description, count, id, name, price } = useSelector((state) => state.UpdateCart);

    // const tempCart = { image, description, count, id, name, price };
    // console.log(tempCart);

    // PRODUCTS.concat(tempCart);
    // console.log(PRODUCTS);
    const CLONE_PRODUCTS = JSON.parse(JSON.stringify(PRODUCTS));

    const [products, setProducts] = React.useState(CLONE_PRODUCTS);
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = React.useState(0);

    const itemCount = products.reduce((quantity, product) => {
        return quantity + product.quantity;
    }, 0);
    const subTotal = products.reduce((total, product) => {
        return total + product.price * +product.quantity;
    }, 0);
    const discount = (subTotal * discountPercent) / 100;

    const onChangeProductQuantity = (index, event) => {
        const value = event.target.value;
        const valueInt = parseInt(value);
        const cloneProducts = [...products];

        // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
        if (value === "") {
            cloneProducts[index].quantity = value;
        } else if (valueInt > 0 && valueInt < 1000) {
            cloneProducts[index].quantity = valueInt;
        }

        setProducts(cloneProducts);
    };

    const onRemoveProduct = (i) => {
        // console.log(i);

        const ProductToDeleted = products.filter((product, index) => {
            return index === i;
        });
        const filteredProduct = products.filter((product, index) => {
            return index !== i;
        });
        // filteredProduct.email = EmailUsed;s


        const data = fetch("/updateCart/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ EmailUsed, ProductToDeleted })
        }).then(response => response.json())
            .then(result => {
                // console.log(result);
            });

        // dispatch({
        //     type: "addproduct",
        //     payload: {
        //         "count": 1, "email": "alfdja l lsadf i la dfi ", "name": name, "description": description,
        //         "id": count, "price": price, "image": img
        //     }
        // });
        // console.log("filtered Products : ");
        // console.log(filteredProduct);
        // console.log("deleted Products : ");
        // console.log(ProductToDeleted);
        setProducts(filteredProduct);
    };

    const onEnterPromoCode = (event) => {
        setPromoCode(event.target.value);
    };

    const checkPromoCode = () => {
        for (var i = 0; i < PROMOTIONS.length; i++) {
            if (promoCode === PROMOTIONS[i].code) {
                setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace("%", "")));

                return;
            }
        }
        toast.error("Sorry, the Promotional code you entered is not valid!", {
            position: "top-right"
        });
    };



    // const PROMOTIONS = [
    //     {
    //         code: "SUMMER",
    //         discount: "50%"
    //     },
    //     {
    //         code: "AUTUMN",
    //         discount: "40%"
    //     },
    //     {
    //         code: "WINTER",
    //         discount: "30%"
    //     }
    // ];
    const TAX = 50;
    function Header({ itemCount }) {
        return (
            <header className="container1" style={{ marginTop: "8%" }}>
                <ul className="breadcrumb">
                    <li><NavLink to="/home"> Home</NavLink> </li>
                    <li>Shopping Cart</li>
                </ul>

                <span className="count">{itemCount} items in the bag</span>
            </header>
        );
    }

    function ProductList({ products, onChangeProductQuantity, onRemoveProduct }) {
        return (
            <div className="container1">
                <ul className="products">
                    {products.map((product, index) => {
                        return (
                            <li className="row" key={index}>
                                <div className="col left">
                                    <div className="thumbnail">
                                        <a href="#">
                                            <img src={product.image} alt={product.name} />
                                        </a>
                                    </div>
                                    <div className="detail">
                                        <div className="name">
                                            <a href="#">{product.name}</a>
                                        </div>
                                        <div className="description">{product.description}</div>
                                        <div className="price">{formatCurrency(product.price)}</div>
                                    </div>
                                </div>

                                <div className="col right">
                                    <div className="quantity">
                                        <input
                                            type="text"
                                            className="quantity"
                                            step="1"
                                            value={product.quantity}
                                            onChange={(event) => onChangeProductQuantity(index, event)}
                                        />
                                    </div>

                                    <div className="remove">
                                        <svg
                                            onClick={() => onRemoveProduct(index)}
                                            version="1.1"
                                            className="close"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 60 60"
                                            enableBackground="new 0 0 60 60"
                                        >
                                            <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    function Summary({
        subTotal,
        discount,
        tax,
        onEnterPromoCode,
        checkPromoCode
    }) {
        const total = subTotal - discount + tax;

        return (
            <div className="container1">
                <div className="promotion">
                    <label htmlFor="promo-code">Have A Promo Code?</label>
                    <input type="text" />
                    <button type="button" className='CartButton' onClick={checkPromoCode} />
                </div>

                <div className="summary">
                    <ul >
                        <li>
                            Subtotal <span>{formatCurrency(subTotal)}</span>
                        </li>
                        {discount > 0 && (
                            <li>
                                Discount <span>{formatCurrency(discount)}</span>
                            </li>
                        )}
                        <li>
                            Tax <span>{formatCurrency(tax)}</span>
                        </li>
                        <li className="total">
                            Total <span>{formatCurrency(total)}</span>
                        </li>
                    </ul>
                </div>

                <div className="checkout">
                    <button type="button" className='CartButton' onClick={handleSubmit} >Check Out</button>
                </div>
            </div>
        );
    }


    const getCart = async () => {
        const data = await fetch("/getCart/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmailUsed
            })
        });

        const res = await data.json();
        // console.log(res);
        if (res.cartValid.length === 0) {
            toast.error("Cart is Empty", {
                position: "top-right"
            });
            return;
        }

        // console.log(res.cartValid[0].list);
        for (let i = 0; i < res.cartValid[0].list.length; i++) {
            let item = {
                id: res.cartValid[0].list[i].id,
                image: res.cartValid[0].list[i].items[0].img,
                name: res.cartValid[0].list[i].items[0].name,
                description: res.cartValid[0].list[i].items[0].description,
                price: res.cartValid[0].list[i].items[0].price,
                quantity: res.cartValid[0].list[i].items[0].quantity,
                link: res.cartValid[0].list[i].items[0].link,
            }
            PRODUCTS.push(item);
            // console.log(item);
        }


    }


    return (
        <>
            <Navbar />
            <div>
                <Header itemCount={itemCount} />

                {products.length > 0 ? (
                    <div >
                        <ProductList
                            products={products}
                            onChangeProductQuantity={onChangeProductQuantity}
                            onRemoveProduct={onRemoveProduct}
                        />
                        <Summary
                            subTotal={subTotal}
                            discount={discount}
                            tax={TAX}
                            onEnterPromoCode={onEnterPromoCode}
                            checkPromoCode={checkPromoCode}
                        />
                    </div>
                ) : (
                    <>
                        <div className="empty-product">
                            <h3>Want to add more products in your cart.</h3>
                            <button className='CartButton' onClick={() => navigate('/shop')} style={{ color: '#fe100' }}>Shopping now</button>
                        </div>
                        <div className="empty-product">
                            <h3>Check out products in your cart.</h3>
                            <button className='CartButton' onClick={() => setProducts(PRODUCTS)} style={{ color: '#fe100' }}>Check out</button>
                        </div>
                    </>

                )}
                <ToastContainer />
            </div>
        </>



    );
}

export default Cart

