"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const create_button_1 = require("./create_button"); // ボタン生成関数をインポート
const scene_manager_1 = require("./scene_manager");
const app = new PIXI.Application({
    width: 400,
    height: 600,
    resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);
app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "400px";
app.renderer.view.style.height = "600px";
app.renderer.view.style.display = "block";
app.renderer.view.style.border = "2px dashed black";
app.renderer.backgroundColor = 0xffffff;
const sceneManager = new scene_manager_1.SceneManager(app);
const setup = () => {
    //
    // 変数定義
    //
    let sceneNumber = 0;
    const createGameScene = () => {
        // 他に表示しているシーンがあれば削除
        sceneManager.removeAllScene();
        // // 毎フレームイベントを削除
        sceneManager.removeAllGameLoops();
        // ゲーム用のシーンを生成
        const gameScene = new PIXI.Container();
        // ゲームシーンを画面に追加
        app.stage.addChild(gameScene);
        // リンゴ
        const apple = PIXI.Sprite.from("assets/images/fruit_ringo.png");
        apple.anchor.x = 0.5;
        apple.anchor.y = 0.5;
        apple.x = app.screen.width / 2;
        apple.y = app.screen.height / 2;
        apple.width = 130;
        apple.height = 130;
        gameScene.addChild(apple);
        // テキスト
        const textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 30,
            fill: 0x000000,
            fontWeight: "bold",
        });
        const title = new PIXI.Text("リンゴは何個？", textStyle);
        title.anchor.set(0.5, 0.5);
        title.x = app.screen.width / 2;
        title.y = 80;
        gameScene.addChild(title);
        // ボタン
        const startButton = create_button_1.createButton("始める", 90, 40, 0xff0000, () => {
            // クリックした時の処理
            console.log("スタート");
        });
        startButton.x = app.screen.width / 2 - 45; // ボタンの座標指定
        startButton.y = 500; // ボタンの座標指定
        gameScene.addChild(startButton);
    };
    createGameScene();
};
PIXI.Loader.shared.add("assets/images/fruit_ringo.png").load(setup);
//# sourceMappingURL=main.js.map