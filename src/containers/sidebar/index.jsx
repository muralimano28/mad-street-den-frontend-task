import React, { Component } from 'react';

// Styles
import './style.css';

// Stores
import Store from 'stores';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFilterInMobile: false
        };

        this.mobileDom = null;
    }
    render() {
        const { filters, appliedFilters, showFilterOptions } = this.props;
        const { showFilterInMobile } = this.state;

        const applyFilter = (ev) => {
            if (ev.target.checked) {
                Store.dispatch({
                    type: 'ADD_FILTER',
                    value: ev.target.value
                });
            } else {
                Store.dispatch({
                    type: 'REMOVE_FILTER',
                    value: ev.target.value
                });
            }
        };

        const clearAllFilters = () => {
            Store.dispatch({
                type: 'CLEAR_ALL_FILTERS'
            });
        };

        const handleFilters = (show) => {
            this.setState({ showFilterInMobile: show });
        };

        const filterList = filters.map((filter, idx) => {
            let checked = (appliedFilters.indexOf(filter) >= 0);
            return (
                <li key={ idx }>
                    <input
                        type="checkbox"
                        id={ "filter-" + idx }
                        value={ filter }
                        onChange={ applyFilter }
                        checked= { checked }
                    />
                    <label htmlFor={ "filter-" + idx } >
                        { filter }
                    </label>
                </li>
            );
        });

        return (
            <div className="filter-container">
                <div className={ "mobile-container" + ((showFilterOptions) ? " active" : "") }>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={ () => this.props.filterHandler("filter", false) }
                    >X</button>
                    <aside className="sidebar">
                        <div className="header">
                            <h3>Filters</h3>
                            <button type="button" onClick={ clearAllFilters }>Clear all</button>
                        </div>
                        <div className="filter category">
                            <h4>Categories</h4>
                            <ul className="noul">
                                { filterList }
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
}
