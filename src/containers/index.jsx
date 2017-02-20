/*
 * This is the starting point of the app.
 * This page will include all other containers here.
 * Other containers are header, sidebar, content and footer.
 */

import React, { Component } from 'react';

/*
 * Importing other necessary containers
 */

import Header from './header';
import Sidebar from './sidebar';
import Content from './content';
import Footer from './footer';

/*
 * Importing default styles which is required for whole app.
 */

import 'styles/normalize.min.css';
import 'styles/default.css';

// Action creators.
import Actions from 'actions';

// Stores.
import Stores from 'stores';

export default class App extends Component {
    _onStoreChange() {
        let { products, filters, appliedFilters } = Stores.getState();

        this.setState({ products, filters, appliedFilters });
    }
    _getFilteredProducts() {
        const { products, appliedFilters } = this.state;

        if (appliedFilters.length) {
            return products.filter((product, idx) => {
                return (appliedFilters.indexOf(product.cat) >= 0);
            });
        } else {
            return products;
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filters: [],
            appliedFilters: []
        };
        this.unSubscribe = null;

        // Binding this to class methods.
        this._onStoreChange = this._onStoreChange.bind(this);
        this._getFilteredProducts = this._getFilteredProducts.bind(this);
    }
    componentWillMount() {
        // Make a AJAX call to the server to get data.
        Actions.getProductData();
    }
    render() {
        return (
            <div>
                <Header />
                <Sidebar
                    filters = { this.state.filters }
                    appliedFilters = { this.state.appliedFilters }
                />
                <Content
                    products = { this._getFilteredProducts() }
                />
                <Footer />
            </div>
        );
    }
    componentDidMount() {
        // Subscribe for any changes in store.
        this.unSubscribe = Stores.subscribe(this._onStoreChange)
    }
    componentWillUnmount() {
        if (this.unSubscribe) {
            this.unSubscribe();
        }
    }
}
