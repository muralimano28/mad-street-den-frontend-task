import { createStore } from 'redux';

let defaultState = {
    products: [],
    filters: [],
    appliedFilters: [],
    noOfItemsToShow: 9,
    sortBy: 'DEFAULT'
};

const getSortedProducts = (type, products) => {
    let sortedProducts = [...products],
        key = null,
        sortType = "ASC"; // Ascending order

    const compareFn = (x, y, key, sortBy) => {
        if (x[key] > y[key]) {
            return (sortBy === "ASC") ? 1 : -1;
        } else if (x[key] < y[key]) {
            return (sortBy === "ASC") ? -1 : 1;
        } else {
            return 0;
        }
    };

    switch(type) {
        case 'SCORE_H_T_L':
            sortType = "DSC"; // Descending order.
            // intentional fallthrough
        case 'SCORE_L_T_H':
            key = "score";
            break;
        case 'PRICE_H_T_L':
            sortType = "DSC"; // Descending order.
            // intentional fallthrough
        case 'PRICE_L_T_H':
            key = "price";
            break;
        default:
            // Do nothing.
    }
    sortedProducts.sort((a, b) => compareFn(a, b, key, sortType))
    return [...sortedProducts];
};

const products = (state = defaultState, action) => {
    let { appliedFilters, noOfItemsToShow, products } = state;
    let idx = -1;
    let sortedProducts = {};

    switch (action.type) {
        case 'GET_PRODUCT_DATA_S': // GET_PRODUCT_DATA_SUCCESS - On getting product data success.
            // Loop through the products and get filter list.
            let filters = [];

            for (let i = 0; i < action.products.length; i++) {
                let eachProduct = action.products[i];

                if (filters.indexOf(eachProduct.cat) < 0) {
                    filters.push(eachProduct.cat);
                }
            }

            return {
                ...state,
                products: action.products,
                filters
            };
        case 'GET_PRODUCT_DATA_E': // GET_PRODUCT_DATA_ERROR - On getting product data error.
            return state;
        case 'ADD_FILTER':
            return {
                ...state,
                appliedFilters: [...appliedFilters, action.value]
            };
        case 'REMOVE_FILTER':
            idx = appliedFilters.indexOf(action.value);

            return {
                ...state,
                appliedFilters: [
                    ...appliedFilters.slice(0, idx),
                    ...appliedFilters.slice(idx + 1)
                ]
            };
        case 'CLEAR_ALL_FILTERS':
            return {
                ...state,
                appliedFilters: []
            };
        case 'LOAD_MORE_PRODUCTS':
            return {
                ...state,
                noOfItemsToShow: noOfItemsToShow + 9
            }
        case 'APPLY_SORT':
            // Check if sorted data is already there in state.
            // If it exists, then return that data.
            // Else prepare data and return it.
            if (!state[action.value]) {
                sortedProducts[action.value] = getSortedProducts(action.value, products);
            }
            return {
                ...state,
                ...sortedProducts,
                sortBy: action.value
            };
        default:
            return state;
    }
};

const store = createStore(
    products
);

export default store;
