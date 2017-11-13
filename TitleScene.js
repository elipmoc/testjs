//タイトル画面

class TitleScene extends GameObject {
    constructor(screen, sceneChanger) {
        super(screen);
        this._sceneChanger = sceneChanger;
        this._text1 = new Text("しゅーてんぐげーむ", screen);
        this._text1.x = screen.width/2;
        this._text1.y = screen.height/2;
        this._text1.fontSize = 50;
        this._text2 = new Text("start enter", screen);
        this._text2.x = screen.width / 2;
        this._text2.y = screen.height / 2+100;
        this._text2.fontSize = 30;
    }

    Update() {
        if(KeyCon.GetKey(13)==1)
            this._sceneChanger.SceneChange(new GameScene(screen,this._sceneChanger));
    }

    Draw() {
        this._text1.Draw();
        this._text2.Draw();
    }
}