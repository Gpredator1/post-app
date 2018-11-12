let webpack = require('webpack');
let CompressionPlugin = require('compression-webpack-plugin');
let path = require('path');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin')


let BUILD_DIR = path.resolve(__dirname,'public');
let APP_DIR = path.resolve(__dirname,'src/');

let config = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		main: [
		'webpack-hot-middleware/client',
		APP_DIR + '/index.jsx'
	]},
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new BrowserSyncPlugin({
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost:8080/'
			}),
		new webpack.DefinePlugin({ //<--key to reduce React's size
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$|\.jsx$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	module : {
		loaders : [
			  {
				test : /\.jsx?/,
				  exclude: /(node_modules|bower_components)/,
				include : APP_DIR,
				loader : 'babel-loader',
				  query: {
					  presets: ['react', 'es2015', 'stage-0'],
					  plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
				  }
			}, {
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
		  }
		]
	  },
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		 historyApiFallback: true,
		 hot: true,
		 contentBase: './public'
	},
    externals: {
    }
};

module.exports = config;
