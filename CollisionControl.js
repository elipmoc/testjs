
//円形のあたり判定形状
class ColliCircle {
    constructor(gameObject) {

        this._deleteFlag = false;
        //半径
        this._radius = 0;
        //衝突したオブジェクトのリスト
        this._hitList;
        //識別タグ
        this._tag = "none";
        //対象となるGameObject
        this._target = gameObject;

        //衝突したオブジェクトのタグ情報を保存するリスト
        this._collisionLogList = new Array();

        CollisionControl.AddColliCircle(this);


    }

    get deleteFlag() { return this._deleteFlag; };
    SetDelete() { this._deleteFlag = true;}

    DebugDraw() {
        this._target.ctx.beginPath();
        this._target.ctx.save();
        this._target.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this._target.ctx.fillStyle = 'rgb(192, 80, 77)';
        /* 半透明度を指定 */
        this._target.ctx.globalAlpha = 0.5;
        this._target.ctx.fill();
        this._target.ctx.closePath();
        this._target.ctx.restore();

    }

    get tag() { return this._tag; }
    set tag(val) { this._tag = val; }

    get radius() { return this._radius; }
    set radius(val) { this._radius = val; }

    get x() { return this._target.x + this._target.width / 2 * this._target.scale };
    get y() { return this._target.y + this._target.height / 2 * this._target.scale };

    SetDelete() { this._deleteFlag = true; }
    get deleteFlag() { return this._deleteFlag;}

    //衝突判定をする
    CheckHit(otherCircle) {
        
        if(Math.pow(this.radius+otherCircle.radius,2)>=Math.pow(this.x-otherCircle.x,2)+Math.pow(this.y-otherCircle.y,2)){
            this._collisionLogList.push(otherCircle.tag);
            otherCircle._collisionLogList.push(this.tag);
        }
    }

    //衝突したオブジェクトを関数にわたして処理させる
    ColliLogProcess(func) {
        this._collisionLogList.forEach(func);
        this._collisionLogList.length = 0;
    }

}

//あたり判定を管理するクラス
//シングルトンクラス
class CollisionControl {

    //初期化
    static Init() {
        this._colliCircleList = new Array();
    }

    static AddColliCircle(colliCircle) {
        this._colliCircleList.push(colliCircle);
    }

    static Update() {

        //要素を削除する
        this._colliCircleList.some((item, i)=> {
            if (item.deleteFlag) this._colliCircleList.splice(i, 1);
        });

        for (var i = 0; i < this._colliCircleList.length; i++) {
            for (var j = i+1; j < this._colliCircleList.length; j++) {
                this._colliCircleList[i].CheckHit(this._colliCircleList[j]);
            }
        }
    }

    static Draw() {
        this._colliCircleList.forEach(colli=>colli.DebugDraw());
    }
}