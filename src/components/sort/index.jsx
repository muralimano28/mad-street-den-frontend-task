import React, { Component, PropTypes } from 'react';

const sortOptions = [
    {
        "label": "Newest first",
        "value": "DEFAULT"
    },
    {
        "label": "Score - High to Low",
        "value": "SCORE_H_T_L"
    },
    {
        "label": "Score - Low to High",
        "value": "SCORE_L_T_H"
    },
    {
        "label": "Price - High to Low",
        "value": "PRICE_H_T_L"
    },
    {
        "label": "Price - Low to High",
        "value": "PRICE_L_T_H"
    }
];

// Styles
import './style.css';

export default class Sort extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { appliedSort } = this.props;

        var sortOpts = sortOptions.map((option, idx) => {
            return (
                <li key={ idx }>
                    <input
                        type="radio"
                        name="sort"
                        value={ option.value }
                        id={ "sort-" + idx }
                        onChange={this.props.onChangeHandler}
                        checked={(appliedSort === option.value) ? true : false}
                    />
                    <label htmlFor={ "sort-" + idx }>{ option.label }</label>
                </li>
            );
        });

        return (
            <div className={ "sort" + ((this.props.showSortOptions) ? " active" : "") }>
                <button
                    type="button"
                    className="close-btn"
                    onClick={ () => this.props.sortHandler("sort", false) }
                >X</button>
                <div className="wrapper">
                    <div className="heading">
                        <h3>Sort</h3>
                    </div>
                    <ul className="noul options">
                        { sortOpts }
                    </ul>
                </div>
            </div>
        );
    }
}
Sort.propTypes = {
    onChangeHandler: PropTypes.func.isRequired
};
Sort.defaultProps = {
    showSortOptions: false
};
