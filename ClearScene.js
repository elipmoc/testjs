//�Q�[���I�[�o�[���

class ClearScene extends GameObject {
    constructor(screen) {
        super(screen);
        this._text1 = new Text("�N���A", screen);
        this._text1.x = screen.width / 2;
        this._text1.y = screen.height / 2;
        this._text1.fontSize = 50;
    }

    Update() {
    }

    Draw() {
        this._text1.Draw();
    }
}