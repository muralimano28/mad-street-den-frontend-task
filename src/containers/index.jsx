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

// Style
import './style.css';

// Action creators.
import Actions from 'actions';

// Stores.
import Stores from 'stores';

export default class App extends Component {
    filterAndSortHandler(type, value) {
        if (type === 'filter') {
            this.setState({ showFilterOptions: value });
        } else {
            this.setState({ showSortOptions: value });
        }
    }
    _onStoreChange() {
        this.setState(Stores.getState());
    }
    _getFilteredProducts() {
        const { products, appliedFilters, sortBy } = this.state;

        let productArr = products;

        if (sortBy !== 'DEFAULT') {
            productArr = this.state[sortBy];
        }
        // console.log("products: ", productArr);

        if (appliedFilters.length) {
            return productArr.filter((product, idx) => {
                return (appliedFilters.indexOf(product.cat) >= 0);
            });
        } else {
            return productArr;
        }
    }
    loadMoreProducts() {
        Stores.dispatch({
            type: 'LOAD_MORE_PRODUCTS'
        });
    }
    constructor(props) {
        super(props);

        this.state = {
            ...Stores.getState(),
            showFilterOptions: false,
            showSortOptions: false
        }

        this.unSubscribe = null;

        // Binding this to class methods.
        this._onStoreChange = this._onStoreChange.bind(this);
        this._getFilteredProducts = this._getFilteredProducts.bind(this);
        this.filterAndSortHandler = this.filterAndSortHandler.bind(this);
    }
    componentWillMount() {
        // Make a AJAX call to the server to get data.
        Actions.getProductData();
    }
    render() {
        let { filters, appliedFilters, noOfItemsToShow, sortBy, showFilterOptions, showSortOptions } = this.state;
        let filteredProducts = this._getFilteredProducts();

        return (
            <div>
                <Header />

                {/* This is sidebar that shows filter options and applied filters */}
                <Sidebar
                    filters = { filters }
                    appliedFilters = { appliedFilters }
                    showFilterOptions = { showFilterOptions }
                    filterHandler = { this.filterAndSortHandler }
                />
                {/* =============== */}

                {/* This is the middle content part which displays all products */}
                <Content
                    products = { filteredProducts }
                    noOfItemsToShow = { noOfItemsToShow }
                    sortBy = { sortBy }
                    showSortOptions = { showSortOptions }
                    sortHandler = { this.filterAndSortHandler }
                />
                {/* =============== */}

                {/* This displays filter and sort buttons in mobile view */}
                <div className="mobile-btns">
                    <div>
                        <img src="assets/images/filter.svg" alt="filter-icon" />
                        <button
                            type="button"
                            className="filter-btn"
                            onClick={ () => this.filterAndSortHandler('filter', true) }
                        >Filter</button>
                        <img
                            src="assets/images/filter-applied.svg"
                            alt="filter-applied"
                            className = { (appliedFilters.length) ? "" : "hide"}
                        />
                    </div>
                    <div>
                        <img src="assets/images/sort.svg" alt="sort-icon" />
                        <button
                            type="button"
                            className="sort-btn"
                            onClick={ () => this.filterAndSortHandler('sort', true) }
                        >Sort</button>
                        <img
                            src="assets/images/filter-applied.svg"
                            alt="filter-applied"
                            className = { (sortBy !== 'DEFAULT') ? "" : "hide"}
                        />
                    </div>
                </div>
                {/* =============== */}

                {/* This is for infinite scrolling */}
                <Loader
                    callback = { this.loadMoreProducts }
                    hideLoader = { (noOfItemsToShow >= filteredProducts.length) ? true : false }
                />
                {/* =============== */}

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
