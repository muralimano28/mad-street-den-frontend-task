import React, { Component, PropTypes } from 'react';

// Styles
import './style.css';

export default class Loader extends Component {
    _isDomVisible() {
        if (!this.domNode) return false;

        var rect = this.domNode.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
    _whenUserStopsScrolling() {
        // Check if loader dom is visible or not.
        // If it is visible, then request for new page by executing the callback from props.

        if (this._isDomVisible()) {
            this.props.callback();
        }

        // Else do nothing.
    }
    _onScroll() {
        if (this.scrollTimerRef) {
            clearTimeout(this.scrollTimerRef);
        }

        this.scrollTimerRef = window.setTimeout(this._whenUserStopsScrolling, 500);
    }
    constructor(props) {
        super(props);

        // Binding this to class methods.
        this._isDomVisible = this._isDomVisible.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._whenUserStopsScrolling =  this._whenUserStopsScrolling.bind(this);

        this.domNode = null;
        this.scrollTimerRef = null;
    }
    componentDidMount() {
        // Add scroll listener.
        window.addEventListener('scroll', this._onScroll);
    }
    render() {
        let { callback, hideLoader } = this.props;

        if (hideLoader) {
            // Showing famous quotes.
            return (
                <div className="quote">
                    <blockquote>
                        "Fashion is very important. It is life-enhancing and, like everything that gives pleasure, it is
                        worth doing well."
                        <br />
                        <br />
                        <span className="name">Vivienne Westwood</span>
                    </blockquote>
                </div>
            );
        }
        return (
            <div className="loader" ref={ (node) => this.domNode = node }>
                <img src="assets/images/loader.svg" alt="Loader-image" />
            </div>
        );
    }
    componentWillUnmount() {
        // Remove scroll listener.
        window.removeEventListener('scroll', this._onScroll);
    }
}
Loader.propTypes = {
    callback: PropTypes.func.isRequired
};
