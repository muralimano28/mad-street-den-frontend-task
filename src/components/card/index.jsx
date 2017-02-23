import React from 'react';

// Styles
import './style.css';

export default ({ data }) => {

    return (
        <div className="card">
            <div className="img-wrapper">
                <div
                    className="img"
                    style = {{ background: "url('" + data.img + "') center center/cover no-repeat" }}
                ></div>
            </div>
            <div className="details">
                <h3>{ data.name }</h3>
                <div className="sub">{ data.cat }</div>
                <div className="score">
                    <span>{ Number((data.score*10)%5).toFixed(2) }</span>
                    <img src="assets/images/rate-star-button.svg" alt="rate-star-icon" />
                </div>
                <div className="price">
                    &#8377;
                    { data.price }
                </div>
                <button type="button" className="buy-btn">Add to cart</button>
            </div>
        </div>
    );
}
