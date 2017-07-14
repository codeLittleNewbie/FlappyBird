### 1.游戏开始
- 1.创建`simple inheritance.js`
	- [http://ejohn.org/blog/simple-javascript-inheritance/]()
	- `Simple Class Creation and Inheritance` 修改中文标点
- 2.添加`r.json`和`images`图片,`underscore-min.js`
- 3.使用中介者设计模式
	![](../image/zjz2.png)
- 4.`Game.js` 中介者类
- 5.初始化准备工作
- 6.`Game.js` 添加功能 初始化方法 运行 游戏循环 暂停游戏 结束游戏
- 7.实例化游戏对象
- 8.`FPS`
	![](../image/fps.png)
	
### 2.游戏的帧数
- 9.`FrameUtil` 帧的工具类
- 10.`Game.js` : FrameUtil 作为Game的属性 runloop中运行 this.frameUtil.render();
- 11.`FrameUtil` 添加属性 render方法
- 12.实例化`Game`时,传入画布 canvas
- 13.`Game.js`: runloop中 绘制总帧数和真实的fps, 运行
- 14.`Game.js`: runloop中 绘制前 清屏

### 3.加载本地的资源数据
- 15.外界传入Game fps参数
- 16.创建`StaticSourceUtil.js: init(), loadImage()`
- 17.`Game.js init`方法中, 初始化本地工具类 加载本地图片资源
- 18.`taticSourceUtil.js`
	- 创建请求对象
	- ajax 三步走
	- 注意:添加r.json到项目
	- `Ajax`复习
		- [http://www.w3school.com.cn/ajax/ajax_xmlhttprequest_create.asp]()
- 19.loadImage() 备份指针

### 4.绘制背景
- 20.`Game.js` 判断图片数 ,开始游戏, run()
- 21.所有的本地图片资源 `this.allImageObj = {};`
- 22.`Game.js : runloop()` 绘制房子, 查看 

```js
this.context.drawImage(this.allImageObj["fangzi"], 200, 200);
```

- 23.封装背景类 `Background.js` 
- 属性 `x,y, width, height, count, speed`
- 函数 `update(), pause(),render(),`

- 24.`Game.js` 游戏运行时初始化背景 run() 

```js
this.fangzi = new Background({})
```

- 25.`Game.js: runloop()` 更新和渲染房子 

```js
this.fangzi.update(); this.fangzi.render();
```

- 26.Game.js 添加总个数属性count 实现 绘制和更新函数 `render()`, `update()`

- 27.绘制树,和地板
- 28.`Game.js: runloop()` 中绘制和更新树和地板 函数 `render(), update()`

- 29.Background.js 添加速度属性

### 5.绘制管道
- 30.分析, 创建管道 `Pipe.js`
属性 : `dir , width, height, x, y ,speed`
- 31.`Pipe.js` : 渲染`render()`
- 32.`Pipe.js` : 更新 `update()` 优化
- 33.Game.js: 初始化管道

```js
if(this.frameUtil.currentFrame %100 == 0){
    this.pipe = new Pipe();
}
```
- 34.Game.js 定义数组属性保存管道

```js 
this.pipeArr = [new Pipe()];
```
- 35.`Game.js` 遍历数组, 更新和渲染管道
- 36.`Pipe.js` : 优化 `update()`

```js
if(this.x == -this.width){
 game.pipeArr = _.without(game.pipeArr, this);
}
```

###  6.绘制小鸟-重力加速度
- 下落高度: `h= 1/2 * g *Math.pow(t, 2)`
- 37.创建 `Bird.js`
	- 属性:`x,y, width, height`
	- 函数 `render() ,update`
- 38.`Game.js` :初始化 `bird` 更新和渲染 `bird`, 运行
- 39.`Bird.js` 翅膀煽动, 添加属性

```js
//1.翅膀状态, 合法值 0,1,2
  this.swing = 0;
//每几帧换一次翅膀
 this.swingRate = 5;
``` 

- 40.Bird.js :重力加速度

```js
添加属性
//3.获取下落时的帧数
  this.dropFrame = game.frameUtil.currentFrame;
//4.y上面的增量
   this.dY = 0;
update(){
  this.dY = 0.01* Math.pow(game.frameUtil.currentFrame- this.dropFrame, 2);
  this.y += this.dY;
}
```

### 7.小鸟往下掉

- 40.`Bird.js` 属性

```js
下落时的角度
this.rotateAngle = 0;
```
- 41.`update()`

```js
//增加这个角度
this.rotateAngle+=1;
```
- 42.旋转公式 `render()`

### 8.小鸟往上飞
- 43.`Bird.js` 属性

```js
//6.鸟的状态 0 下 1 上
this.state = 0;
```

- 44.`Bird.js` 添加监听点击函数
- 45.`Bird.js` 初始化时调用点击事件 `this.bindClickListen();`

- 46.Bird.js update(){}

```js
// 移到下面: this.y += this.dY;
// 根据小鸟的状态判断是往上还是往下

// 代码移动到if中
//自由落体
// console.log(Math.pow(game.frameUtil.currentFrame- this.dropFrame, 2));
this.dY = 0.001* Math.pow(game.frameUtil.currentFrame- this.dropFrame, 2);
//增加这个角度
this.rotateAngle+=1;
```
47.`Bird.js` 属性 空气阻力 `this.deltaY = 1;`

48.`Bird.js :`

```js
else {
	// 点击往上移动
	bindClickListen(){
	// 归位空气的阻力
	self.deltaY = 1;
	} 
}

```
- 49.`Bird.js update()` 判断是否超出屏幕
	- 封锁上空 处理碰到地板

### 9.碰撞检测
- 50.暂停游戏 `Game.js`

```js
pause:function () {
   clearInterval(this.timer);
},
// 确认pipe, backgournd 是否实现了 方法pause()
```
- 50.`Game.js gameOver()` 让所有场景都暂停

- 51.`Pipe.js update(){}` 小鸟和管道碰撞检测

- 52.`Bird.js` 添加属性 `this.die = false;`

- 53.`Game.js gameOver(){}`
	- 发出通知,鸟死了 `this.bird.die = true;`

### 10.抛热血
- 54.`Game.js`

```js
// 检测游戏是否结束 属性
this.isGameOver = false;
```
55.`Game.js gameOver(){} this.isGameOver = true;`

56.`Game.js runloop()` 初始化管道 , 运行

```js
// 初始化管道 (gameOver的时候,不初始化管道了)
if(!this.isGameOver && this.frameUtil.currentFrame %100 == 0){
  this.pipeArr.push(new Pipe());
}
```
- 57.`Bird.js render()` 绘制小鸟死亡出血动画

- 58.`Bird.js render()` 求出行和列,改写绘制参数

```js
添加属性
鸟死亡的动画索引
this.dieAnimationIndex = 0;
```

- 59.`Bird.js update(){}`

```js
死亡帧动画
if(this.die){
this.dieAnimationIndex++;
    if(this.dieAnimationIndex == 30){
        game.pause();
     }
      return;
}

// 绘制热血x 减100, 运行
```
- 60.绘制游戏结束

```js
Bird.js render()
game.context.drawImage(game.allImageObj["gameover"],
(game.canvas.width - 626)*0.5, 
(game.canvas.height -144) *0.5);
```

- 61.调整画布宽高

### 11 结束
- thankyou!! ☺☺☺