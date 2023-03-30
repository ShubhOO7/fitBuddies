import './App.css';
import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import Challenges from './pages/Challenges';
import About from './pages/About';
import Discuss from './pages/Discuss';
import Shop from './pages/Shop';
import Cart from './components/Cart';
import Success from './payment/SuccessDone';
import PostMain from './pages/Blogs/PostHead';
// import Header from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import NewPost from './pages/Blogs/addPost';
import PostDetails from './pages/Com_Blogs/postDetails';

// import "./styles.css";


// import PostDetails from "./pages/PostDetails/PostDetails";
// import NewPost from "./pages/Blogs/addPost";
// import ProtectedRoutes from './ProtectedRoutes';
// import '@fontsource/roboto/400.css';


function App() {

    return (
        <React.Fragment>
            <header>
                {/* <Header /> */}
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Register />} exact />
                    <Route path='/login' element={<Login />} exact />
                    <Route path='/home' element={<Home />} exact />
                    <Route path='/discuss' element={<Discuss />} exact />
                    <Route path='/challenges' element={<Challenges />} exact />


                    <Route path='/posts' element={<PostMain />} exact />
                    <Route path='/newpost' element={<NewPost />} exact />
                    <Route path="/post/:id" element={<PostDetails />} />

                    <Route path='/about' element={<About />} exact />
                    <Route path='/shop' element={<Shop />} exact />
                    <Route path='/cart' element={<Cart />} exact />
                    <Route path='/success' element={<Success />} exact />
                </Routes>
            </main>
        </React.Fragment >
    );
}

export default App;
