const url = require('url');

const movieRedirect = (response, newUrl, valid) => {
    response.redirect(url.format({
        pathname : newUrl,
        query: {
            "valid":valid,
         }

    }));
};

module.exports = movieRedirect;