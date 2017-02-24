import React, { Component } from 'react';

// Styles
import './style.css';

// Components
import Card from 'components/card';
import Sort from 'components/sort';

// Store.
import Store from 'stores';

export default class MainContent extends Component {
    onSorting(ev) {
        Store.dispatch({
            type: 'APPLY_SORT',
            value: ev.target.value
        });
    }
    constructor(props) {
        super(props);

        // Binding this to class methods.
        this.onSorting = this.onSorting.bind(this);
    }
    render() {
        let { products, noOfItemsToShow, sortBy } = this.props;

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
                <div className="header">
                    <div className="name">
                        <h3>Products</h3>
                        <span> - { products.length } Items</span>
                    </div>
                    <Sort
                        onChangeHandler = { this.onSorting }
                        appliedSort = { sortBy }
                        sortHandler = { this.props.sortHandler }
                        showSortOptions = { this.props.showSortOptions }
                    />
                </div>
                <div className="products">
                    { productList }
                </div>
            </section>
        );
    }
}
