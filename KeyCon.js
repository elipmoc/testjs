


//キー判定をコントロールするクラス
//静的クラス
class KeyCon {
    //初期化
    static Init() {
        this._keyMax = 256;
        this._keys = new Array(this._keyMax);
        for (var i = 0; i < this._keyMax; i++)
            this._keys[i] = 0;

        //キーを離した時のイベント
        $(window).keyup((e) => {
            this._keys[e.keyCode] = 0;
            console.log(e.keyCode+"up");
            return false;
        });

        //キーを押した時のイベント
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

    //指定のキーコードの状態を取得する
    static GetKey(KeyCode) {
        return this._keys[KeyCode];
    }
}