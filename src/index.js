import React from 'react';
import { render } from 'react-dom';

import App from 'containers';

render(
    <App />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('containers', () => {
        const NewRoot = require('containers').default;

        render(
            <NewRoot />,
            document.getElementById('root')
        );
    })
}
