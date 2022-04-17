const fs = require("fs");
const path = require("path");
const pkgInfo = require("./package.json");

module.exports = (_, argv) => {
  // Store some information
  const { mode } = argv,
    // Store flag for later usage
    isProduction = mode === "production",
    // No source-maps on production
    sourceMaps = isProduction ? false : "eval-source-map",
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
    entry: "./src/index.tsx",
    // Output
    output: {
      // Destination as defined before
      path: dest,
      // Create filename
      filename: `${pkgInfo.name}.${fileExt}`,
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
        }
      ]
    },
    resolve: {
      // Extensions to resolve
      extensions: [".tsx", ".jsx", ".ts", ".js"]
    }
  }
};