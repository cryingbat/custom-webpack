const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//压缩代码
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
//   mode: "development",
  mode: 'production',
  entry: "./main.js",
  devtool: 'none', // 开启source-map方便开发调式
  resolve: {  // 引入不需要带后缀
    extensions: ['.js', '.json']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webpack.bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        use: [
            {
                loader:'url-loader',
                options: {
                    limit: 1024,
                    name:'[path][name].[ext]',
                }
            }
        ]
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
            configFile: path.resolve(__dirname, 'tsconfig.json')
　　　　 }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 清楚dist目录
    new HtmlWebpackPlugin({ 
        template: "./index.html",
        minify: {
            removeComments: true, // 移除空格
            collapseWhitespace: true, // 合并空行
        } 
    }), // html模板
    new CopyWebpackPlugin({ // copy静态文件
      patterns: [
        {
          from: __dirname + "/static",
          to: __dirname + "/dist/static",
        },
      ],
    }),
    
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, // 一切服务都启用gzip 压缩：
    port: 9000,
    hot: true,
    open: true,
    proxy: {
        "/api": {
            target: "http://localhost:3000",
            pathRewrite: {"^/api" : ""}
        }
    },
    useLocalIp: true
  }
};
