
//获取游戏开始按钮
let startBtn = document.getElementsByClassName('start')[0];
// 获取游戏区域
let gameGround = document.getElementsByClassName('main')[0];

//获取屏幕高度
let clientHeight = window.screen.availHeight;
gameGround.style.top = - 60 + 'px';

let timer = null,
    speed = 5,
    score = 0,
    flag = true;
//游戏开始
startBtn.addEventListener('click',function () {
    // console.log(this);
    this.style.display = 'none';
    move();
})

/**
 * 创建小方块
 */
function createDiv () {
    let index = Math.floor(Math.random() * 4);

    let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class','row');
   
    for (let i = 0 ; i < 4 ; i++) {
        let colDiv = document.createElement('div');
        colDiv.setAttribute('class','col');
        rowDiv.appendChild(colDiv);
    }
    if (gameGround.childNodes.length == 0) {
        gameGround.appendChild(rowDiv);
    } else {
        gameGround.insertBefore(rowDiv,gameGround.childNodes[0]);
    }
    // 选取随机的小方块，为其添加样式
    let targetDiv = gameGround.childNodes[0].childNodes[index];
    targetDiv.classList.add('target');
    targetDiv.style.backgroundColor = randomColor();
}

/**
 * 
 * 1.实现移动
 * 2.判断游戏是否结束
 */
function move () {
    clearInterval(timer);

    timer = setInterval(function () {
        let newTop = parseInt(gameGround.offsetTop) + speed;
        gameGround.style.top = newTop + 'px';
        if (parseInt(gameGround.offsetTop) >= 0) {
            gameGround.style.top = - 60 + 'px';
            createDiv();
        }
        let len = gameGround.childNodes.length;
        // 当小方块那一行已经超出游戏区域，移除小方块
        if (len >= Math.ceil(clientHeight / 60) + 1) {
            for (let i = 0 ; i < 4 ; i ++) {
                // 判断要移除区域的那一行里面的小方块是否包含指定的类名，如果有说明没有被点击到
                if (gameGround.childNodes[len - 1].childNodes[i].classList.contains('target')) {
                    alert('Game Over 最终得分：' + score);
                    clearInterval(timer);
                    flag = false;
                }
            }
            gameGround.removeChild(gameGround.childNodes[len - 1]);
        }
    },40);

    bindEvent();
}


/**
 * 1.给方块绑定事件
 * 2.判断是否点击错误
 */
function bindEvent () {
    gameGround.addEventListener('click',function (e) {
        if (flag) {
            let originDiv = e.target;   //  获取事件源对象
            if (originDiv.className.indexOf('target') > -1) {
                console.log('ok');
                originDiv.style.backgroundColor = '#bbb';
                originDiv.classList.remove('target');
                score++;
            } else {
                alert('Game Over 最终得分：' + score);
                clearInterval(timer);
                flag = false;
            }
            // 每增加10分就让速度增加
            if (score % 10 == 0) {
                speed++;
            }
        }
     
    });
}

/**
 * 产生随机颜色
 */
function randomColor () {
    let color = '';
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    return color;
}