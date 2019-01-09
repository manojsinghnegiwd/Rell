var webpack = require('webpack');
var path = require('path');

var parentDir = __dirname;

module.exports = {
    entry: path.join(parentDir, 'Rell.js'),
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    output: {
        path: parentDir + '/libs',
        filename: 'Rell.js',
        library: 'Rell',
        libraryTarget: 'umd'
    }
}
