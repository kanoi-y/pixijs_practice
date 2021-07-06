"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createButton = void 0;
const PIXI = require("pixi.js");
/**
 * ボタンを生成してオブジェクトを返す関数
 * @param text テキスト
 * @param width 横幅
 * @param height 縦幅
 */
function createButton(text, width, height, color, onClick) {
    const fontSize = 20; // フォントサイズ
    const buttonAlpha = 0.6; // ボタン背景の透明度
    const buttonContainer = new PIXI.Container(); // ボタンコンテナ（ここにテキストと背景色を追加して返り値とする）
    // ボタン作成
    const backColor = new PIXI.Graphics(); // グラフィックオブジェクト（背景に半透明な四角を配置するために使用）
    backColor.beginFill(color, buttonAlpha); // 色、透明度を指定して描画開始
    backColor.drawRoundedRect(0, 0, width, height, 8); // 位置(0,0)を左上にして、width,heghtの四角形を描画
    backColor.endFill(); // 描画完了
    backColor.interactive = true; // クリック可能にする
    backColor.buttonMode = true;
    backColor.on("pointerdown", onClick); // クリック時にonClickの関数を実行する
    buttonContainer.addChild(backColor); // 背景をボタンコンテナに追加
    // テキストに関するパラメータを定義する(ここで定義した意外にもたくさんパラメータがある)
    const textStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: fontSize,
        fill: 0xffffff,
        dropShadow: true,
        dropShadowDistance: 2, // ドロップシャドウの影の距離
    });
    const buttonText = new PIXI.Text(text, textStyle); // テキストオブジェクトをtextStyleのパラメータで定義
    buttonText.anchor.x = 0.5; // アンカーを中央に設置する(アンカーは0~1を指定する)
    buttonText.anchor.y = 0.5; // アンカーを中央に設置する(アンカーは0~1を指定する)
    buttonText.x = width / 2; // ボタン中央にテキストを設置するため、width/2の値をx値に指定
    buttonText.y = height / 2; // ボタン中央テキストを設置するため、height/2の値をy値に指定
    buttonContainer.addChild(buttonText); // ボタンテキストをボタンコンテナに追加
    return buttonContainer; // ボタンコンテナを返す
}
exports.createButton = createButton;
//# sourceMappingURL=create_button.js.map