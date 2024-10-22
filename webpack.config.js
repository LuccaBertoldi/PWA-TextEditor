import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import path from 'path';
import { fileURLToPath } from 'url';
import { InjectManifest } from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Define __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
  return {
    mode: 'development', // Change to 'production' for production builds
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      database: './src/js/database.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Clean the output directory before each build
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to HTML template
        filename: 'index.html', // Output HTML file
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your custom service worker
        swDest: 'src-sw.js', // Output service worker file
      }),
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App',
        description: 'Your app description.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: path.resolve('./favicon.ico'), // Path to your app icon
            sizes: [192, 512], // Icon sizes
            destination: path.join('icons'), // Output directory for icons
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css', // Output path for CSS
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // Match CSS files
          use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use the MiniCssExtractPlugin and css-loader
        },
        {
          test: /\.js$/, // Match JS files
          exclude: /node_modules/, // Exclude node_modules
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Use the env preset
            },
          },
        },
        {
          test: /\.(ico|png|jpg|jpeg|gif|svg)$/, // Match image files
          type: 'asset/resource', // Automatically handles images
        },
      ],
    },
  };
};
