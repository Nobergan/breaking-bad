const chokidar = require("chokidar");
const os = require("os");
const fs = require("fs");
const process = require("process");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const HtmlWebpackSkipAssetsPlugin =
  require("html-webpack-skip-assets-plugin").HtmlWebpackSkipAssetsPlugin;

const isDev = process.env.NODE_ENV === "development";
let chrome;
switch (process.platform) {
  case "linux":
    chrome = "google-chrome";
    break;
  case "darwin":
    chrome = "Google Chrome";
    break;
  default:
    chrome = "chrome";
    break;
}

// MAKE A COLLECTION OF HTML FILES FROM PAGES
const collectPagesNames = (directory) => {
  try {
    const filenames = fs.readdirSync(path.join(__dirname, directory));
    return filenames;
  } catch (error) {
    console.log(error);
  }
};

// INSERT NEW CONFIGS HERE
const configs = [createConfig() /*createConfig("news")*/];

configs.forEach((config, index) => {
  config.devServer.port = 8080 + index;
});

module.exports = configs;

function createConfig(configName = "main") {
  const name = configName;
  const config = {
    name: configName,
    mode: isDev ? "development" : "production",
    entry: `./src/${name}/index.js`,

    output: {
      publicPath: isDev ? "" : "assets/",
      assetModuleFilename: "[contenthash][ext]",
      filename: isDev ? "index.js" : "js/index.[fullhash].js",
      path: path.resolve(__dirname, `dist/${configName}/assets/`),
    },

    devtool: isDev ? "eval-cheap-module-source-map" : false,
    devServer: {
      onBeforeSetupMiddleware(server) {
        chokidar.watch(
          [`./src/${name}/templates/**/*.html`, `./src/${name}/index.ejs`],
          {
            ignorePermissionErrors: true,
          }
        );
      },
      devMiddleware: {
        publicPath: `/`,
      },

      hot: true,
      host: getMyLocalIP(),
      open: true,
      client: {
        overlay: {
          warnings: true,
          errors: true,
        },
      },
    },

    optimization: {
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          exclude: [path.resolve(__dirname, "node_modules"), /\.min.js$/],
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/styles.[fullhash].css",
      }),
      new HtmlWebpackPlugin({
        disable: isDev,
        filename: `index.html`,
        template: `./src/${name}/index.ejs`,
        minify: false,
        inject: "body",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[contenthash].[ext][query]",
            //   filename: pathdata => {
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: "../",
                  },
                },
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isDev
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: "../",
                  },
                },

            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: isDev,
              },
            },
            {
              loader: "resolve-url-loader",
              options: {},
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.html$/i,
          use: [
            {
              loader: "html-loader",
              options: {
                esModule: false,
                minimize: {
                  removeComments: true,
                  collapseWhitespace: false,
                  conservativeCollapse: false,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "img/[contenthash][ext][query]",
          },
          use: [
            {
              loader: "image-webpack-loader",
              options: {
                disable: isDev,
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          use: "handlebars-loader",
        },
      ],
    },
  };

  if (config.name === "main") {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/main/js/copy"),
            to: `${isDev ? "assets/" : ""}js/`,
            noErrorOnMissing: true,
          },
          {
            from: path.resolve(__dirname, "src/main/css"),
            to: `${isDev ? "assets/" : ""}css`,
            noErrorOnMissing: true,
          },
        ],
      })
    );
  }

  const pageNames = collectPagesNames(`src/${configName}/pages`);
  
  const htmlPlugins = pageNames.map(
    (filename) =>
      new HtmlWebpackPlugin({
        disable: isDev,
        filename,
        template: `./src/${configName}/pages/${filename}`,
        minify: false,
        inject: "body",
      })
  );
  config.plugins.push(...htmlPlugins);
  return config;
}

function getMyLocalIP() {
  const nets = Object.values(os.networkInterfaces());
  let ips = [];

  for (const net of nets) {
    const filtered = net.filter(
      (item) => item.family === "IPv4" && item.address !== "127.0.0.1"
    );
    if (filtered.length) {
      ips = [...ips, ...filtered];
    }
  }
  return ips[0].address;
}
