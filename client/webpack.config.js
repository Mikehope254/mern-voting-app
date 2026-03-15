import { resolve as _resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/index.js";
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "bundle.js",
  publicPath: "/",
};
export const mode = "development";
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      include: [
        _resolve(__dirname, "src"),
        _resolve(__dirname, "node_modules/react-chartjs-2"),
      ],
      use: "babel-loader",
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ],
};
export const resolve = {
  extensions: [".js", ".jsx"],
};
export const devServer = {
  static: join(__dirname, "dist"),
  port: 3000,
  historyApiFallback: true,
  open: true,
  proxy: {
    "/api": "http://localhost:4000", // Make sure this matches your backend port
    "/sockjs-node": {
      target: "http://localhost:3000",
      ws: true,
    },
  },
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
];
