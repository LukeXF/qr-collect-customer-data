const path = require('path');

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "My Gatsby Site",
	},
	plugins: [
		"gatsby-plugin-emotion",
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					'@components': path.resolve(__dirname, 'src/components'),
					'@helpers': path.resolve(__dirname, 'src/helpers'),
					'@images': path.resolve(__dirname, 'src/images'),
					'@styles': path.resolve(__dirname, 'src/styles'),
					'@fonts': path.resolve(__dirname, 'src/fonts'),
					'@views': path.resolve(__dirname, 'src/views'),
					'@models': path.resolve(__dirname, 'src/models'),
					'@assets': path.resolve(__dirname, 'src/assets'),
					'@store': path.resolve(__dirname, 'src/store'),
					'@theme': path.resolve(__dirname, 'src/theme'),
					'@data': path.resolve(__dirname, 'src/data'),
				},
				extensions: [],
			},
		},
	],
};
