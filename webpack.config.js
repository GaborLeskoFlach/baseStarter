"use strict";
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/app.tsx'
    ],

    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, exclude: /(node_modules)/, loaders: ['react-hot', 'ts-loader'] },
            { test: /\.css$/, loader: 'style!css!' },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
}