const bcd = require('mdn-browser-compat-data');

function package(query) {
    let data = query.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, bcd);
    return data;
}

module.exports = {
    package
}
