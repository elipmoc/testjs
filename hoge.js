//キャンバスに表示するゲームオブジェクト
class GameObject {
    constructor(screen) {
        this._screen = screen;
        this._ctx = this._screen.getContext('2d');
        this._x = 0;
        this._y = 0;
    }
    get x() { return this._x; }
    set x(val) { this._x = val; }
    get y() { return this._y; }
    set y(val) { this._y = val; }

    get ctx() { return this._ctx; }
    get screen() { return this._screen; }

    //更新インターフェイス
    Update() { }

    //描画インターフェイス
    //param:2dコンテキスト
    Draw(){}
}

//画像オブジェクト
class Sprite extends GameObject{

    constructor(src,screen) {
        super(screen);
        // Imageオブジェクトを生成
        this._img = new Image();
        //画像設定
        this._img.src = src;
        this._scale = 1;
    }


    get img() { return this._img; }
    get width() { return this._img.width; }
    get height() { return this._img.height; }
    get scale() { return this._scale; }
    set scale(val) {
        this._scale = val;
    }

    Update() {
    }

    Draw() {
        super.ctx.scale(this.scale, this.scale);
        super.ctx.drawImage(this._img, super.x/this.scale, super.y/this.scale);
        super.ctx.scale(1 / this.scale, 1 / this.scale);
    }
}

//textオブジェクト
class Text extends GameObject{

    constructor(text,screen) {
        super(screen);
        //text設定
        this._text = text;
        this.fontSize = 20;
        this.textAlign = "center";
    }

    get textAlign() { return this._textAlign;}
    set textAlign(val){
        this._textAlign=val;
        super.ctx.textAlign=val;
    }
    get fontSize() { return this._fontSize; }
    set fontSize(val) {
        this._fontSize = val;
        
    }
    get text() {
        return this._text;
    }

    Update() {
    }

    Draw() {
        super.ctx.font = this.fontSize + 'px Century Gothic';
        super.ctx.fillText(this._text, super.x, super.y);
    }
}

class Game {

    constructor(screen) {
        //キー判定初期化
        KeyCon.Init();
        //あたり判定制御クラス初期化
        CollisionControl.Init();
        // スクリーンの初期化
        this._screen = screen;
        this._screen.width = 480;
        this._screen.height = 640;
        // 2dコンテキスト
        this._ctx = this._screen.getContext('2d');
        this._scene;
        /* 画像を描画 */
        //this.sprite = new Sprite(this.ctx,"野獣.jpg");
        setInterval(() =>this.Draw(), 16.6);
        setInterval(() =>this.Update(), 16.6);
        
    }

    AddScene(newScene) {
        this._scene=newScene;
    }

    Update() {
        this._scene.Update();
        KeyCon.Update();
        CollisionControl.Update();
    }

    Draw() {
        // screenクリア 
        this._ctx.clearRect(0, 0, this._screen.width, this._screen.height);
        this._scene.Draw();
        //CollisionControl.Draw();
       
    }
}

//シーン遷移に使うクラス
class SceneChanger {
    constructor(game) {
        this._game = game;
    }

    //シーン遷移を実行
    SceneChange(newScene) {
        this._game.AddScene(newScene);
    }
}

