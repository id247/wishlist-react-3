var path = require('path');
var webpack = require('webpack');

var appSettings = path.join(__dirname, 'src/js/settings/local.js');

module.exports = {
	devtool: '#inline-source-map',
	entry: {
		local: [
			'whatwg-fetch',
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'./src/js/index'
		],
	},
	output: {
		path: path.join(__dirname, 'dev'),
		filename: '[name].js',
		publicPath: 'http://localhost:3000/assets/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		modulesDirectories: ['node_modules'],
		extentions: ['', '.js'],
		alias: {
			appSettings: appSettings,
		}
	},
	devServer: {
	},
	module: {
		noParse: [
			],
			loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src/js'),
				loader: 'react-hot',
			},
			{   
				test: /\.js$/, 
				loader: 'babel',
				include: [
				path.join(__dirname, '/src/js'),
				], 
				query: {
					cacheDirectory: true,
	          		presets: ['es2015', 'react', 'stage-2']
	      		}
	  		},
  		]
	}
};
