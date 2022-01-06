const path = require("path");

module.exports = {
    entry: './dist/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.[hash].js'
    },
}
