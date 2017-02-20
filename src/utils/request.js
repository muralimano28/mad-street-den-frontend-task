import configs from 'configs';
import Stores from 'stores';

const { serverConfig } = configs

// This is an array to store current pending requests.
let _pendingRequest = [];

const _abortPendingRequest = (key) => {
    if(_pendingRequest[key]) {
        _pendingRequest[key].abort();
        delete _pendingRequest[key];
    }
}

const _getXHR = (method, url) => {
    let xhr = null;

    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhr;
}

const _callback = (res = {}, key) => {
    let actionType = null;

    if (!res || (res && res.status >= 400)) {
        actionType = key + '_E';
    } else {
        actionType = key + '_S';
    }

    Stores.dispatch({
        type: actionType,
        ...res
    });

	// Removing executed request from pending list
	delete _pendingRequest[key];
}

const _makeRequest = (url, method, data, key) => {
    // Aborting any previous requests with same key.
    _abortPendingRequest(key);

    // Get xhr object.
    let xhr = _getXHR();

    if (!xhr) {
        console.log("XMLHttpRequest object is not available in this browser");
        return null;
    };

    xhr.open(method, url, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = function() {
        let jsonResponse = null;
        try {
            jsonResponse = JSON.parse(this.response);
        } catch(err) {
            jsonResponse = { "data": null, "error": err, "status": 500 };
        }
        _callback(jsonResponse, key);
    };

    xhr.onerror = function() {
        let response = this.response;
        if(!response || response === "") {
            response = {
                status: 503,
                error: "Sorry, unable to reach server. Please check your internet connection and try again after some time"
            };
        }
        _callback(response, key);
    };

    xhr.send(JSON.stringify(data));

    return xhr;
}

export default {
    'getProductData': () => {
        let key = 'GET_PRODUCT_DATA';

        _pendingRequest[key] = _makeRequest(serverConfig.products, 'GET', null, key);
    }
};
