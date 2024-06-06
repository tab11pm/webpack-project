const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.[chunkhash].js',
		path: path.resolve(__dirname, 'public'),
	},
	devServer: {
		port: 3000,
	},
	//? for html
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin({
			title: 'My App',
			filename: 'assets/admin.html',
		}),
	],
	//? for css style
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
