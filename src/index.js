import React from 'react';
import { render } from 'react-dom';

import App from 'containers/app';

render(
    <App />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('containers/app', () => {
        const NewRoot = require('containers/app').default;

        render(
            <NewRoot />,
            document.getElementById('root')
        );
    })
}
