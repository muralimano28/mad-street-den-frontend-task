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
import Sidebar from 'containers/sidebar';
import Content from 'containers/main-content';
import Footer from './footer';

/*
 * Components
 */

import Loader from 'components/loader';

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
        this.setState(Stores.getState());
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
    loadMoreProducts() {
        Stores.dispatch({
            type: 'LOAD_MORE_PRODUCTS'
        });
    }
    constructor(props) {
        super(props);

        this.state = Stores.getState();

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
        let { filters, appliedFilters, noOfItemsToShow } = this.state;
        let filteredProducts = this._getFilteredProducts();

        return (
            <div>
                <Header />
                <Sidebar
                    filters = { filters }
                    appliedFilters = { appliedFilters }
                />
                <Content
                    products = { filteredProducts }
                    noOfItemsToShow = { noOfItemsToShow }
                />
                <Loader
                    callback = { this.loadMoreProducts }
                    hideLoader = { (noOfItemsToShow >= filteredProducts.length) ? true : false }
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
