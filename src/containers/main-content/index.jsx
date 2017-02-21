import React from 'react';

// Styles
import './style.css';

// Components
import Card from 'components/card';

export default ({ products }) => {
    let productList = products.map((product, idx) => {
        return (
            <Card key={ idx } data={ product } />
        );
    });
    return (
        <section className="main-content">
            <div className="products">
                { productList }
            </div>
        </section>
    );
}
