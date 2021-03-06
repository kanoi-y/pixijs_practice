module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  //mode: "production",
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    //minimize: true,
  },

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./typescript/main.js",

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
      },
    ],
  },
};
