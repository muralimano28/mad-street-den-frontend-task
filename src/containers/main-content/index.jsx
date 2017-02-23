import React from 'react';

// Styles
import './style.css';

// Components
import Card from 'components/card';

export default ({ products, noOfItemsToShow }) => {
    // Handling edge case when noOfItemsToShow is more than availabel products.
    noOfItemsToShow = (products.length > noOfItemsToShow) ? noOfItemsToShow : products.length;

    let productList = [];

    for(let i = 0; i < noOfItemsToShow; i++) {
        productList.push(
            <Card key = { i } data = { products[i] } />
        );
    }
    return (
        <section className="main-content">
            <div className="products">
                { productList }
            </div>
        </section>
    );
}
