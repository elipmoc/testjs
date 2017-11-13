


//�L�[������R���g���[������N���X
//�ÓI�N���X
class KeyCon {
    //������
    static Init() {
        this._keyMax = 256;
        this._keys = new Array(this._keyMax);
        for (var i = 0; i < this._keyMax; i++)
            this._keys[i] = 0;

        //�L�[�𗣂������̃C�x���g
        $(window).keyup((e) => {
            this._keys[e.keyCode] = 0;
            console.log(e.keyCode+"up");
            return false;
        });

        //�L�[�����������̃C�x���g
        $(window).keydown((e) => {
            if (this._keys[e.keyCode] == 0)
                this._keys[e.keyCode] = 1;
            console.log(e.keyCode+"press");
            return false;
        });
    }

    static Update() {
        for (var i = 0; i < this._keys.length; i++) {
                if (this._keys[i] != 0)
                      this._keys[i]++;
        }
    }

    //�w��̃L�[�R�[�h�̏�Ԃ��擾����
    static GetKey(KeyCode) {
        return this._keys[KeyCode];
    }
}