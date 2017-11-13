//弾
class Bullet extends Sprite {
    constructor(screen,fileName,tag,radius) {
        super(fileName, screen);
        this._addx = 0;
        this._addy = 0;
        this._vx = 0;
        this._vy = 0;
        this._deleteFlag = false;
        this._colli = new ColliCircle(this);
        this._colli.tag = tag;
        this._colli.radius = radius;
    }

    get deleteFlag() { return this._deleteFlag; };
    SetDelete() { this._deleteFlag = true; this._colli.SetDelete(); }

    get addx() { return  this._addx; }
    set addx(val) { this._addx = val;}
    get addy() { return this._addy; }
    set addy(val) { this._addy = val; }
    get vx() { return this._vx; }
    set vx(val) { this._vx = val; }
    get vy() { return this._vy; }
    set vy(val) { this._vy = val; }

    Update() {
        this._colli.ColliLogProcess(tag=> {
            if (tag == "enemy" && this._colli.tag=="playerBullet" ){
               this.SetDelete();
            }
        });
        super.x += this._addx;
        super.y += this._addy;
        this._addx += this._vx;
        this._addy += this._vy;
        if (super.x < -80 || super.x > super.screen.width +80 || super.y< -150 || super.y > super.screen.height+80)
            this.SetDelete();
    }

}

//弾管理リスト
class BulletList extends GameObject{
    constructor(screen) {
        super(screen);
        this._list = new Array();
    }
    AddBullet(bullet) {
        this._list.push(bullet);
    }

    Update() {
        //要素を削除する
        this._list.some((item, i) => {
            if (item.deleteFlag) this._list.splice(i, 1);
        });

        this._list.forEach((val) =>val.Update());
    }
    Draw() {
        this._list.forEach((val) =>val.Draw());
    }

}

//主人公
class Player extends Sprite {
    constructor(screen,deadFunc) {
        super("Player.png", screen);
        this._bulletList = new BulletList(screen);
        this.speed = 4;
        this.deadFunc = deadFunc;
        this._count = 0;
        super.scale = 1.5;
        super.img.onload =
            () => {
                this.x = this.screen.width / 2 - this.width / 2 * this.scale;
                this.y = this.screen.height - this.height * this.scale;
                this._colli = new ColliCircle(this);
                this._colli.tag = "player";
                this._colli.radius = 5;

            };
    }

    Update() {
        this._colli.ColliLogProcess(tag=> {
            if (tag == "enemyBullet"||tag=="enemy") {
                this._colli.SetDelete();
                this.deadFunc();
            }
        });
        
        if (KeyCon.GetKey(39) != 0) {
            super.x += this.speed;
        }
        if (KeyCon.GetKey(37) != 0) {
            super.x -= this.speed;
        }
        if (KeyCon.GetKey(40) != 0) {
            super.y += this.speed;
        }
        if (KeyCon.GetKey(38) != 0) {
            super.y -= this.speed;
        }
        if (KeyCon.GetKey(90) != 0) {
            if (this._count % 10 == 0) {
                // 再生するファイルのアドレス(URL)を指定してオブジェクト作成
                var audio = new Audio("shot.mp3");
                audio.play();
                var bullet = new Bullet(super.screen,"bullet2.png","playerBullet",30);
                bullet.x = super.x+10;
                bullet.y = super.y;
                bullet.scale = 1.5;
                bullet.addy = -9;
                this._bulletList.AddBullet(bullet);
            }
            this._count++;
        }
        else
            this._count = 0;
        this._bulletList.Update();
    }

    Draw() {
        super.Draw();
        this._bulletList.Draw();
    }
}



//敵
class Enemy extends Sprite {
    constructor(screen, deadFunc,player) {
        super("D.png", screen);
        this._hp = 100;
        this._enemyHpBar = new EnemyHpBar(screen,this._hp);
        this.deadFunc = deadFunc;
        this._bulletList = new BulletList(screen);
        super.y = 30;
        this._speed = 3;
        this._colli = new ColliCircle(this);
        this._colli.tag = "enemy";
        this._colli.radius = 50;
        this._barrageKind = 0;
        this._counter = -1;
        this._phaseHpList = [60,40, 20];
        this._player = player;
    }
    Update() {
        //カウント処理
        this._counter++;

        //あたり判定処理
        this._colli.ColliLogProcess(tag=> {
            if (tag == "playerBullet") {
                this._hp--;
                if(this._hp<=0)
                {
                    this._colli.SetDelete();
                    this.deadFunc();
                }
            }
        });

        //移動処理
        if (super.x < 0 || super.x > super.screen.width-super.width*super.scale)
            this._speed *= -1;
        super.x += this._speed;

        //弾幕の選択
        if (this._hp <= this._phaseHpList[this._barrageKind]) {
            this._barrageKind++;
            this._counter = 0;
        }

        switch (this._barrageKind) {

            case 0:
                if (this._counter % 60 == 0) {
                    for (var i = 0; i < 18; i++) {
                        bullet = new Bullet(super.screen, "bullet1.png", "enemyBullet", 6);
                        bullet.x = super.x + 10;
                        bullet.y = super.y;
                        bullet.scale = 1;
                        var angle = i * 20 * Math.PI / 180;
                        bullet.addy = Math.sin(angle) * 3;
                        bullet.addx = Math.cos(angle) * 3;
                        bullet.vy =- bullet.addy / 100;
                        bullet.vx =- bullet.addx / 100;
                        this._bulletList.AddBullet(bullet);
                    }
                }

                this._bulletList.Update();
                break;

            //全方向弾幕の処理
            case 2:
                if (this._counter % 50 == 0) {
                    var addAngle = Math.random() * 20;
                    for (var i = 0; i < 18; i++) {
                        bullet = new Bullet(super.screen, "bullet1.png", "enemyBullet", 6);
                        bullet.x = super.x + 10;
                        bullet.y = super.y;
                        bullet.scale = 1;
                        var angle = i*20* Math.PI /180+addAngle;
                        bullet.addy = Math.sin(angle) * 4.5;
                        bullet.addx = Math.cos(angle) * 4.5;
                        bullet.vy = -Math.sin(angle)*0.015;
                        bullet.vx = -Math.cos(angle)*0.015;
                        this._bulletList.AddBullet(bullet);
                    }
                }

                this._bulletList.Update();
                break;
                //ランダム弾幕の処理
            case 3:
                var bullet = new Bullet(super.screen, "bullet1.png", "enemyBullet", 6);
                bullet.x = super.x + 10;
                bullet.y = super.y;
                bullet.scale = 1;
                var angle = Math.random() * Math.PI * 2;
                bullet.addy = Math.sin(angle) * 2;
                bullet.addx = Math.cos(angle) * 2;
                this._bulletList.AddBullet(bullet);
                this._bulletList.Update();
                break;
            case 1:

                if (this._counter % 50 == 0) {
                    for (var i = -10; i < 20; i += 10) {
                        var bullet = new Bullet(super.screen, "bullet1.png", "enemyBullet", 6);
                        var angle = i * Math.PI / 180 + Math.atan2(this._player.y - super.y, this._player.x - super.x);
                        bullet.x = super.x + 10;
                        bullet.y = super.y;
                        bullet.scale = 1;
                        bullet.addy = Math.sin(angle) * 4;
                        bullet.addx = Math.cos(angle) * 4;
                        this._bulletList.AddBullet(bullet);
                    }
                }
                
                if (this._counter % 10 == 0 && this._counter<18*10) {
                    var bullet = new Bullet(super.screen, "bullet1.png", "enemyBullet", 6);
                    var angle = (this._counter/10)*10 * Math.PI / 180;
                    bullet.x = screen.width/2+ Math.cos(angle) * 120;
                    bullet.y = screen.height/2-150+ Math.sin(angle) * 120;
                    bullet.scale = 1;
                    bullet.addy = Math.sin(angle) * 2;
                    bullet.addx = Math.cos(angle) * 2;
                    this._bulletList.AddBullet(bullet);
                }

                else if (this._counter % 10 == 0 && this._counter < 18 * 10 *2) {
                    var bullet = new Bullet(super.screen, "bullet1.png", "enemyBullet", 6);
                    var angle = (360-(this._counter / 10) * 10) * Math.PI / 180;
                    bullet.x = screen.width / 2 + Math.cos(angle) * 120;
                    bullet.y = screen.height / 2 - 150 + Math.sin(angle) * 120;
                    bullet.scale = 1;
                    bullet.addy = Math.sin(angle) * 3;
                    bullet.addx = Math.cos(angle) * 3;
                    this._bulletList.AddBullet(bullet);
                    
                }
                else if (this._counter%10==0)
                    this._counter = 0;
                
                this._bulletList.Update();
                break;
            default:
                break;

        }
       


    }
    Draw() {
        super.Draw();
        this._bulletList.Draw();
        this._enemyHpBar.Draw(this._hp);
    }
}

//敵HPバー
class EnemyHpBar extends GameObject {
    constructor(screen,maxHp) {
        super(screen);
        this._maxHp=maxHp;
    }

    Draw(hp) {
        super.ctx.save();
        super.ctx.fillStyle = 'rgb(0, 255, 0)';
        super.ctx.fillRect(0, 0, 480*(hp/this._maxHp), 20);
        super.ctx.restore();
    }

}

//ほんへ
class GameScene extends GameObject {
    constructor(screen, sceneChanger) {
        super(screen);
        this.back = new Sprite("宇宙.jpg", screen);
        this.back.scale = 1.6;
        this._player = new Player(screen, () =>sceneChanger.SceneChange(new GameOverScene(screen)));
        this._enemy = new Enemy(screen,()=>sceneChanger.SceneChange(new ClearScene(screen)),this._player);
        this._enemy.scale = 0.5;

        // 再生するファイルのアドレス(URL)を指定してオブジェクト作成
        var audio = new Audio("bgm.mp3");
        audio.play();
        audio.loop = true;

    }

    Update() {
        
        this._player.Update();
        this._enemy.Update();
    }

    Draw() {
        this.back.Draw();
        this._enemy.Draw();
        this._player.Draw();
    }
}