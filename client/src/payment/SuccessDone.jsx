import React from 'react';
import "./success.css";
import { useSearchParams } from 'react-router-dom';

const success = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("references")
    return (
        <div className="BodyS">
            <div className="cardS">
                <div
                    style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                    <i className="checkmarkS">✓</i>
                </div>
                <h1 className='FONTS'>Success</h1>
                <p className='PARA'>We received your purchase request.<br /> we'll be in touch shortly!</p>
            </div>
        </div>
    )
}

export default success