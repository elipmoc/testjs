
//�~�`�̂����蔻��`��
class ColliCircle {
    constructor(gameObject) {

        this._deleteFlag = false;
        //���a
        this._radius = 0;
        //�Փ˂����I�u�W�F�N�g�̃��X�g
        this._hitList;
        //���ʃ^�O
        this._tag = "none";
        //�ΏۂƂȂ�GameObject
        this._target = gameObject;

        //�Փ˂����I�u�W�F�N�g�̃^�O����ۑ����郊�X�g
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
        /* �������x���w�� */
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

    //�Փ˔��������
    CheckHit(otherCircle) {
        
        if(Math.pow(this.radius+otherCircle.radius,2)>=Math.pow(this.x-otherCircle.x,2)+Math.pow(this.y-otherCircle.y,2)){
            this._collisionLogList.push(otherCircle.tag);
            otherCircle._collisionLogList.push(this.tag);
        }
    }

    //�Փ˂����I�u�W�F�N�g���֐��ɂ킽���ď���������
    ColliLogProcess(func) {
        this._collisionLogList.forEach(func);
        this._collisionLogList.length = 0;
    }

}

//�����蔻����Ǘ�����N���X
//�V���O���g���N���X
class CollisionControl {

    //������
    static Init() {
        this._colliCircleList = new Array();
    }

    static AddColliCircle(colliCircle) {
        this._colliCircleList.push(colliCircle);
    }

    static Update() {

        //�v�f���폜����
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