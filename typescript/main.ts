import * as PIXI from "pixi.js";
import { createButton } from "./create_button"; // ボタン生成関数をインポート
import { SceneManager } from "./scene_manager";

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

const sceneManager = new SceneManager(app);

const setup = () => {
  //
  // 変数定義
  //
  let count = 0;

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
    apple.anchor.set(0.5);
    apple.x = app.screen.width / 2;
    apple.y = app.screen.height / 2;
    apple.width = 130;
    apple.height = 130;
    gameScene.addChild(apple);

    // テキスト
    const textStyle = new PIXI.TextStyle({
      fontFamily: "Arial", // フォント
      fontSize: 30, // フォントサイズ
      fill: 0x000000, // 色(16進数で定義するので#ffffffと書かずに0xffffffと書く)
      fontWeight: "bold",
    });
    const title = new PIXI.Text("リンゴは何個？", textStyle);
    title.anchor.set(0.5, 0.5);
    title.x = app.screen.width / 2;
    title.y = 80;
    gameScene.addChild(title);

    const gameLoop = () => {
      apple.width *= 1.02;
      apple.height *= 1.02;
    };

    // ボタン
    const startButton = createButton("始める", 90, 40, 0xff0000, () => {
      // クリックした時の処理
      sceneManager.addGameLoop(gameLoop);

      setTimeout(() => {
        secondGameScene();
      }, 2000);
    });
    startButton.x = app.screen.width / 2 - 45; // ボタンの座標指定
    startButton.y = 500; // ボタンの座標指定
    gameScene.addChild(startButton);
  };

  const secondGameScene = () => {
    // 他に表示しているシーンがあれば削除
    sceneManager.removeAllScene();
    // // 毎フレームイベントを削除
    sceneManager.removeAllGameLoops();

    // ゲーム用のシーンを生成
    const gameScene = new PIXI.Container();
    // ゲームシーンを画面に追加
    app.stage.addChild(gameScene);

    // リンゴ
    const texture = PIXI.Texture.from("assets/images/fruit_ringo.png");

    // 上に被るappleのY座標
    let backAppleY = 0;

    // 素早いリンゴの座標を再設定するかどうかのフラッグ
    let quickAppleFlag = false;
    let quickAppleX: 1 | -1, quickAppleY: 1 | -1;

    // 一度クリックしたappleを保存する配列
    let countedApple = [];

    for (let i = 0; i < 4; i++) {
      let appleX = 40 + i * 105;
      const apple = new PIXI.Sprite(texture);
      apple.anchor.set(0.5);
      apple.x = appleX;
      apple.y = Math.floor(Math.random() * 409) + 150;
      if (i === 2) {
        backAppleY = apple.y;
      }
      apple.width = 80;
      apple.height = 80;
      apple.interactive = true; // クリック可能にする
      apple.on("pointerdown", (e: PointerEvent) => {
        if (!countedApple.includes(i)) {
          count++;
          countedApple.push(i);
        }
        onDragStart(e);
      });
      apple.on("pointerup", onDragEnd);
      apple.on("pointerupoutside", onDragEnd);
      gameScene.addChild(apple);
    }

    // 上に載っているリンゴ
    const backApple = new PIXI.Sprite(texture);
    backApple.anchor.set(0.5);
    backApple.x = 250;
    backApple.y = backAppleY;
    backApple.width = 80;
    backApple.height = 80;
    backApple.interactive = true; // クリック可能にする
    backApple.on("pointerdown", (e: PointerEvent) => {
      if (!countedApple.includes(4)) {
        count++;
        countedApple.push(4);
      }
      onDragStart(e);
    });

    backApple.on("pointerup", onDragEnd);
    backApple.on("pointerupoutside", onDragEnd);
    gameScene.addChild(backApple);

    // 早く動いているリンゴ
    const quickApple = new PIXI.Sprite(texture);
    quickApple.anchor.set(0.5);
    quickApple.x = app.screen.width + 50;
    quickApple.y = -50;
    quickApple.width = 80;
    quickApple.height = 80;
    quickApple.interactive = true;
    quickApple.on("pointerdown", (e: PointerEvent) => {
      if (!countedApple.includes(5)) {
        count++;
        countedApple.push(5);
      }
    });

    gameScene.addChild(quickApple);

    // 選択中の要素を保存
    let selectedTarget;

    function onDragStart(e) {
      selectedTarget = e.target;
      console.log("start!");
      backApple.on("pointermove", onDragMove);
    }

    function onDragMove(e) {
      console.log("move!");
      selectedTarget.parent.toLocal(
        e.data.global,
        null,
        selectedTarget.position
      );
    }

    function onDragEnd() {
      console.log("up!");
      backApple.off("pointermove", onDragMove);
    }

    // テキスト
    const titleStyle = new PIXI.TextStyle({
      fontFamily: "Arial", // フォント
      fontSize: 20, // フォントサイズ
      fill: 0x000000, // 色(16進数で定義するので#ffffffと書かずに0xffffffと書く)
      fontWeight: "bold",
    });
    const title = new PIXI.Text("リンゴを全てクリックしよう！！", titleStyle);
    title.anchor.set(0.5, 0.5);
    title.x = app.screen.width / 2;
    title.y = 80;
    gameScene.addChild(title);

    const textStyle = new PIXI.TextStyle({
      fontFamily: "Meiryo", // フォント
      fontSize: 14, // フォントサイズ
      fill: 0x000000, // 色(16進数で定義するので#ffffffと書かずに0xffffffと書く)
      fontWeight: "bold",
    });

    const countText = new PIXI.Text(`count: ${count}`, textStyle);
    countText.x = 20;
    countText.y = 20;
    gameScene.addChild(countText);

    const gameLoop = () => {
      countText.text = `count: ${count}`;

      if (quickAppleFlag === false) {
        if (Math.floor(Math.random() * 100) < 1) {
          quickApple.x =
            Math.floor(Math.random() * 2) === 0 ? -50 : app.screen.width + 50;
          quickApple.y =
            Math.floor(Math.random() * 2) === 0 ? -50 : app.screen.height + 50;

          quickAppleX = quickApple.x === -50 ? 1 : -1;
          quickAppleY = quickApple.y === -50 ? 1 : -1;
          quickAppleFlag = true;
        }
      }
      if (quickAppleFlag === true) {
        quickApple.x += 9 * quickAppleX;
        quickApple.y += 9 * quickAppleY;

        if (quickApple.x > app.screen.width + 50 || quickApple.x < -50) {
          quickAppleFlag = false;
        }
      }
    };
    sceneManager.addGameLoop(gameLoop);
  };

  createGameScene();
};
PIXI.Loader.shared.add("assets/images/fruit_ringo.png").load(setup);
