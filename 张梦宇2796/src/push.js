/****游戏变量设置**********/
var level=0;//游戏等级，初始为第0关，界面显示为第1关
var boxNum=[3,4,5,5,6,5,4]; //每一关可移动的箱子数量，参考现有的推箱子小游戏进行关卡设置
var initPosition=[15,29,44,45,94,39,56];//每关初始时的马里奥的位置，计算方式为i*12+j
var position=initPosition[level];//根据关卡选择位置
var success=boxNum[level]; //过关条件
//block数组是一个8*12的二维数组，每一个数组元素代表一个div
/*0代表游戏界面以外的区域；
  1代表边界；
  2代表可以移动的路径；
  3代表“黄土区”，表示所有需要将蘑菇种进的区域；
  4代表蘑菇初始位置*/
var block=[
    [
        0,0,1,1,1,1,1,0,0,0,0,0,
        0,0,1,2,2,2,1,0,0,0,0,0,
        0,0,1,2,4,4,1,0,1,1,1,0,
        0,0,1,2,4,2,1,0,1,3,1,0,
        0,0,1,1,1,2,1,1,1,3,1,0,
        0,0,0,1,1,2,2,2,2,3,1,0,
        0,0,0,1,2,2,2,1,2,2,1,0,
        0,0,0,1,2,2,2,1,1,1,1,0,
        0,0,0,1,1,1,1,1,0,0,0,0
    ],
    [
        0,0,0,0,1,1,1,1,0,0,0,0,
        0,0,0,1,1,2,2,1,0,0,0,0,
        0,0,0,1,2,2,4,1,0,0,0,0,
        0,0,0,1,1,2,2,1,1,0,0,0,
        0,0,0,1,1,4,4,2,1,0,0,0,
        0,0,0,1,3,4,2,2,1,0,0,0,
        0,0,0,1,3,3,2,3,1,0,0,0,
        0,0,0,1,1,1,1,1,1,0,0,0
    ],
    [
        0,0,0,0,1,1,1,1,1,1,1,0,
        0,0,0,1,1,2,2,1,2,2,1,0,
        0,0,0,1,2,2,2,1,4,2,1,0,
        0,0,0,1,4,2,4,2,2,2,1,0,
        0,0,0,1,2,4,1,1,2,2,1,0,
        0,1,1,1,2,4,2,1,2,1,1,0,
        0,1,3,3,3,3,3,2,2,1,0,0,
        0,1,1,1,1,1,1,1,1,1,0,0
    ],
    [
        0,0,0,0,1,1,1,1,1,1,0,0,
        0,0,1,1,1,2,2,2,2,1,0,0,
        0,1,1,3,2,4,1,1,2,1,1,0,
        0,1,3,3,4,2,4,2,2,2,1,0,
        0,1,3,3,2,4,2,4,2,1,1,0,
        0,1,1,1,1,1,1,2,2,1,0,0,
        0,0,0,0,0,0,1,1,1,1,0,0
    ],
    [
        0,0,1,1,1,1,1,1,1,1,1,0,
        0,0,1,2,2,1,1,2,2,2,1,0,
        0,0,1,2,2,2,4,2,2,2,1,0,
        0,0,1,4,2,1,1,1,2,4,1,0,
        0,0,1,2,1,3,3,3,1,2,1,0,
        0,1,1,2,1,3,3,3,1,2,1,1,
        0,1,2,4,2,2,4,2,2,4,2,1,
        0,1,2,2,2,2,2,1,2,2,2,1,
        0,1,1,1,1,1,1,1,1,1,1,1
    ],
    [
        0,0,0,0,1,1,1,1,1,1,0,0,
        0,0,0,0,1,2,2,2,2,1,0,0,
        0,0,1,1,1,4,4,4,2,1,0,0,
        0,0,1,2,2,4,3,3,2,1,0,0,
        0,0,1,2,4,3,3,3,1,1,0,0,
        0,0,1,1,1,1,2,2,1,0,0,0,
        0,0,0,0,0,1,1,1,1,0,0,0
    ],
    [
        0,0,1,1,1,1,0,0,1,1,1,1,
        1,1,1,2,2,1,0,0,1,2,2,2,
        1,1,2,4,2,1,1,1,1,4,2,2,
        1,1,2,2,4,3,3,3,3,2,4,2,
        1,1,1,2,2,2,2,1,2,2,2,1,
        1,0,1,1,1,1,1,1,1,1,1,1
    ]
];

/****计算变量设置*****/
var divNum=12;//增量，每上移一个单元就减这个增量；每下移一个单元就加这个增量

/*****把div放入数组方便操作****/
var boxList=$('.box div');
/****对整个游戏画面进行初始化******/
function Init(){
    //首先将所有的div都给清空了
    boxList.each(function(index){
        boxList.eq(index).removeClass();
    });
    boxList.each(function(index,element){ //循环整个div的数量 二维数组里数量不够的 默认为空白
        if(block[level][index]){ //过滤0
            boxList.eq(index).addClass('class'+block[level][index]);
        }
    });
    boxList.eq(initPosition[level]).addClass("pusher"); //皮卡丘位置
}


/*****等级选择按钮******/
$("button").click(function(){
    var a= $(this);
    if(a.hasClass('selectbt1')){
        //通过val属性获取当前的等级数
        level=$(".selctVal1").val();
        $(".selctVal").val(level);
    }else{
        console.log("选中2");
        //通过val属性获取当前的等级数
        level=$(".selctVal").val();
        console.log(level);
        if(level>=0&&level<=2)
        $(".selctVal1").val(0);
        else if(level>2&&level<=4)
        $(".selctVal1").val(2);
        else $(".selctVal1").val(5);
    }
    //通过当前的等级数获得需要推的箱子的数量
    success = boxNum[level];
    position = initPosition[level];//皮卡丘位置
    Init(); //创建地图
})



/****重写keydown函数，用来移动方块***/
$(document).keydown(function (e) {
    //按照顺时针上右下左
    var key=e.which;
    switch(key){
        //上
        case 38:
            move(-divNum);
        break;
        //右
        case 39:
            move(1);
        break;
        //下
        case 40:
           move(divNum);
        break;
        //左
        case 37:
            move(-1);
        break;
    }
    //通过回调来判断输赢，防止乱序
    setTimeout(win,100);
    //通过回调来判断输赢，防止乱序
    setTimeout(lose,100);
});



/***move函数，实现小人和箱子的移动***/
function move(step){
    //马里奥现在在哪里
    var now=boxList.eq(position);
    //此次移动后马里奥的位置
    var next=boxList.eq(position+step);
    //此次移动后箱子的位置
    var nextBox=boxList.eq(position+step*2);
    //判断是否只是在正常的路径上移动
    if(!next.hasClass('class4')&&( next.hasClass('class3')||next.hasClass('class2'))){
        now.removeClass("pusher");
        next.addClass("pusher");//移动皮卡丘
        position=position+step;//增加position值
    }
    //判断移动路径是否有黄土地
    else if((next.hasClass('class4'))&&(!nextBox.hasClass('class4'))&&(nextBox.hasClass('class3')|| nextBox.hasClass('class2')) ) {
        //如果有的话，就更改此时下一步的div的样式
        next.removeClass('class4');
        now.removeClass("pusher");
        nextBox.addClass('class4');
        next.addClass("pusher").addClass("class2");
        //增加position值
        position=position+step;
        //将没有箱子的黄土地回归原貌
        for(var i=0;i<8;i++){
            for(var j=0;j<12;j++){
                if(block[level][i*12+j]==3){
                    var a=boxList.eq(i*12+j);
                    if(!a.hasClass('class4')&&a.hasClass('class3')){
                        a.removeClass('class2');
                    }
                }
            }
        }
    }

}
/****判断是否获胜*****/
function win(){
    if($(".class3.class4").length===success){
        if(level<6) {
            alert("本关卡顺利通过！进入下一关");
            level++; //关卡+1
            goal = boxNum[level];
            position = initPosition[level];
            Init();
        }else {
            con=confirm("您已经通关！是否重新开始？"); //在页面上弹出对话框
            if(con==true){
                    level=0;
                    //通过当前的等级数获得需要推的箱子的数量
                    success = boxNum[level];
                    position = initPosition[level];//皮卡丘位置
                    Init(); //创建地图
            }
        }
    }
}
/****判断是否输了****/
function lose(){
    console.log("进入lose");
    var wcount=0;
    for(var i=0;i<8;i++){
        for(var j=0;j<12;j++){
            console.log(i+":"+j);
            var now=boxList.eq(i*12+j);
            if(now.hasClass('class4')){
                var top = boxList.eq((i-1)*12+j);
                var right = boxList.eq(i*12+j+1);
                var bottom = boxList.eq((i+1)*12+j);
                var left = boxList.eq(i*12+j-1)
                var count=0;
                if(top.hasClass('class2')&&bottom.hasClass('class2'))
                continue;
                else if(left.hasClass('class2')&&right.hasClass('class2'))
                    continue;
                else wcount++;
            }
        }
    }
    if(wcount==success){
        con=confirm("闯关失败！是否重新开始？"); //在页面上弹出对话框
            if(con==true){
                    //通过当前的等级数获得需要推的箱子的数量
                    success = boxNum[level];
                    position = initPosition[level];
                    Init();
            }
    }
}
//游戏开始时首先调用init函数进行整个游戏的初始化
Init();
