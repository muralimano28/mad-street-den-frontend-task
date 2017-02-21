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
                <p className="sub">{ data.cat }</p>
                <p>{ Number((data.score*10)%5).toFixed(2) }</p>
                <div>
                    <button type="button">Add to cart</button>
                    <p>{ data.price }</p>
                </div>
            </div>
        </div>
    );
}
