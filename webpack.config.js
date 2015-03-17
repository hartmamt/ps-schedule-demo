var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config.js');

var env = config.get('env');
console.log('env:', env);

var commonConfig = {
  externals: {
    'react': 'React'
  },
  module: {
    loaders: [{
        test: /\.css$/, loader: 'style!css!cssnext'
      }, {
        test: /\.jsx?$/, loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password')),
      '__SCHEDULE_URL__': JSON.stringify(config.get('getScheduleUrl'))
    })
  ]
};

var devConfig = {
  entry: {
    Arus: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './index.js']
  },
  output: {
    libraryTarget: 'var',
    library: '[name]',
    /* eslint-disable */
    path: __dirname + '/build/',
    /* eslint-enable */
    publicPath: 'http://localhost:8080/build/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
        test: /\.css$/, loader: 'style-loader!css-loader!cssnext-loader'
      }, {
        test: /\.jsx?$/, loader: 'react-hot!babel-loader', exclude: /node_modules.(?!arus-ps-connector)/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password')),
      '__SCHEDULE_URL__': JSON.stringify(config.get('getScheduleUrl'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

var prodConfig = {
  entry: {
    Arus: './index.js'
  },
  output: {
    libraryTarget: 'var',
    library: '[name]',
    path: './release',
    filename: '[name].js'
  },
  externals: commonConfig.externals,
  module: commonConfig.module,
  plugins: commonConfig.plugins
};

switch(env) {
  case 'production':
    module.exports = prodConfig;
    break;
  case 'development':
    var server = new WebpackDevServer(webpack(devConfig), {
      hot: true,
      historyApiFallback: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      publicPath: devConfig.output.publicPath
    });
    server.listen(8080, 'localhost', function(err) {
      if (err) { console.log(err); }
    });
    module.exports = devConfig;
    break;
  default:
    module.exports = devConfig;
    break;
}
