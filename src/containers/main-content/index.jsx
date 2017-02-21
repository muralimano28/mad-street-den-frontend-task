import React from 'react';

// Styles
import './style.css';

export default ({ products }) => {
    return (
        <section className="main-content">
            <h1>Total count of products is { products.length }</h1>
        </section>
    );
}
