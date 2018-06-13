const webpack = require('webpack');
const express = require('express');
const path = require('path');

// const isDeveloping = process.env.NODE_ENV !== 'production';
const isDeveloping = true;

const app = express();
const port = isDeveloping ? 3000 : process.env.PORT;
// Constants
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);

const middleware = webpackMiddleware(compiler, {
    hot: true,
    publicPath: '/',
    noInfo: true,
    quiet: false,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    stats: {
        colors: true,
    }
});

const bundlePath = path.join(__dirname, './dist/index.html');
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function(req, res) {
    res.write(middleware.fileSystem.readFileSync(bundlePath));
    res.end();
});

// app.use(express.static(__dirname + 'dist'));

app.listen(port, '0.0.0.0', function() {
    console.log("Server is UP");
});