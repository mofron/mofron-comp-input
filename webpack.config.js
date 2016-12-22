module.exports = {
    entry: __dirname + '/src/inputtext.js',
    output: {
        path: __dirname + '/dist',
        filename: 'inputtext.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'  ,
            query: {
                presets: ['es2015']
            }
        }]
    }
};
