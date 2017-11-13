//�L�����o�X�ɕ\������Q�[���I�u�W�F�N�g
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

    //�X�V�C���^�[�t�F�C�X
    Update() { }

    //�`��C���^�[�t�F�C�X
    //param:2d�R���e�L�X�g
    Draw(){}
}

//�摜�I�u�W�F�N�g
class Sprite extends GameObject{

    constructor(src,screen) {
        super(screen);
        // Image�I�u�W�F�N�g�𐶐�
        this._img = new Image();
        //�摜�ݒ�
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

//text�I�u�W�F�N�g
class Text extends GameObject{

    constructor(text,screen) {
        super(screen);
        //text�ݒ�
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
        //�L�[���菉����
        KeyCon.Init();
        //�����蔻�萧��N���X������
        CollisionControl.Init();
        // �X�N���[���̏�����
        this._screen = screen;
        this._screen.width = 480;
        this._screen.height = 640;
        // 2d�R���e�L�X�g
        this._ctx = this._screen.getContext('2d');
        this._scene;
        /* �摜��`�� */
        //this.sprite = new Sprite(this.ctx,"��b.jpg");
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
        // screen�N���A 
        this._ctx.clearRect(0, 0, this._screen.width, this._screen.height);
        this._scene.Draw();
        //CollisionControl.Draw();
       
    }
}

//�V�[���J�ڂɎg���N���X
class SceneChanger {
    constructor(game) {
        this._game = game;
    }

    //�V�[���J�ڂ����s
    SceneChange(newScene) {
        this._game.AddScene(newScene);
    }
}

