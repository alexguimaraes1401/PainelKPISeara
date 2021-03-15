import React from 'react';

// NotFoundPage component
// props.match.url contains the current url route
const NotFoundPage = ({ match }) => {
    const { url } = match;

    return (
        <div>
            <h1>Whoops!</h1>
            <p><strong>{url.replace('/', '')}</strong> could not be located.</p>
        </div>
    );
};

export default NotFoundPage;