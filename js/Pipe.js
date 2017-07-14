(function () {
    window.Pipe = Class.extend({
        init : function () {
            // 1.方向 0:向下,1:向上
             this.dir = _.random(0,1);
            // 2.宽高
            this.width = 148;
            this.height = _.random(100,game.canvas.height * 0.5);
            // 3.坐标
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - this.height - 48;

            // 4.速度
            this.speed = 4;

        },
        
        update : function () {
            this.x -= this.speed;
            
            // 离开画布部分销毁
            // 提升性能
            if (this.x < -this.width){
                game.pipeArr = _.without(game.pipeArr,this);
            }

            // 管道和小鸟的碰撞检测
            // 首先判断小鸟是否进入了管道区域
            if(game.bird.x + game.bird.width > this.x && game.bird.x < this.x + this.width) { // 进入管道区域

                // 在判断管道朝向以及是否与管道接触
                if(this.dir == 0) { // 管道向下
                    if(game.bird.y < this.height ) {
                        // 接触,暂停游戏,绘制热血 -> 绘制文字 -> 停止定时器
                        game.pause();
                    }
                } else if (this.dir == 1){ // 管道向上
                    if((game.bird.y + game.bird.height) > this.y ) {
                        game.pause();
                    }
                }
                
            }
        },

        pause : function () {
            this.speed = 0;
        },

        render : function () {
            // 判断方向
            if(this.dir == 0) { // 向下

                game.context.drawImage(game.allImageObj['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
                
            } else if (this.dir == 1) {// 向上
                
                game.context.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
                
            }
        }
    });
})();
