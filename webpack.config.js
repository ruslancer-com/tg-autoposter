const path = require('path');

module.exports = {
  entry: './lambda/index.ts',  // Entry point for your Lambda function
  target: 'node',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2' 
  }
};
