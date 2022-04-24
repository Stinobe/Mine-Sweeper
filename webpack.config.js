const fs = require("fs");
const path = require("path");
const pkgInfo = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (_, argv) => {
  // Store some information
  const { mode } = argv,
    // Store flag for later usage
    isProduction = mode === "production",
    // No source-maps on production
    sourceMaps = isProduction ? false : "inline-source-map",
    // Add hash to javascript file on production build to prevent caching
    fileExt = isProduction ? "[contenthash].js" : ".js",
    // Destination folder
    dest = path.join(__dirname, "dist");
  
  // Remove the destination folder on production build if one exists
  if (isProduction && fs.existsSync(dest)) fs.rm(dest, { recursive: true }, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Destination folder has been removed.");
  });

  return {
    // Set the mode which was sent with the npm command
    mode,
    // Entry file
    entry: {
      [`${pkgInfo.name}`]: "./src/index.tsx",
      "react-vendors": ["react", "react-dom", "react-router-dom"]
    },
    // Output
    output: {
      // Destination as defined before
      path: dest,
      // Create filename
      filename: `[name].${fileExt}`,
      publicPath: "/",
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    // Define type of source-maps
    devtool: sourceMaps,
    // Module settings
    module: {
      rules: [
        // Rule for JS(X) Files
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        // Rule for TS(X) files
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader"
        },
        // Rule for styles
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader"
          ]
        }
      ]
    },
    resolve: {
      // Extensions to resolve
      extensions: [".tsx", ".jsx", ".ts", ".js"],
      plugins: [
        new TsconfigPathsPlugin()
      ]
    },
    devServer: {
      historyApiFallback: true,
      host: `${pkgInfo.name}.local`,
      liveReload: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: pkgInfo.name,
        template: "./src/index.html"
      })
    ]
  };
};