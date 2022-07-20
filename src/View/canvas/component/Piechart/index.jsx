import React, { useEffect } from 'react'

export default function PieChart() {
    // 饼状图数据
    var data = [100, 68, 20, 30, 100];
    // 颜色列表
    var colors = ["orange", "green", "blue", "yellow", "teal"];
    // 画背景色
    const drawBackGround = (c) => {
        c.fillStyle = "white";
        c.fillRect(0, 0, 375, 500);
    }
    //画饼状图
    const drawPieData = (c) => {
        let total = 0;
        // 计算总份数
        data.map((item) => total += item)
        // 角度
        let prevAngle = 0;
        data.map((itemTwo, index) => {
            let fraction = itemTwo / total
            // 计算当前的角度 之前的角度+占总比的比例*2pi，简单的数学题
            const angle = prevAngle + fraction * Math.PI * 2;
            // 每一个的颜色
            // c.fillStyle = colors[index];
            // 每一个的颜色变为渐变色，以x=200,y=200,半径=10画一个圆开始，以x=200,y=200,半径为100画圆结束
            const grad = c.createRadialGradient( 200,200, 10, 200,200, 100); 
            grad.addColorStop(0,"white"); 
            grad.addColorStop(1,colors[index]);
            
            c.fillStyle = grad; 
            // 画线
            c.beginPath();
            // 从坐标点（200, 200）开始绘画
            c.moveTo(200, 200);
            // 画一个圆从x=200，y=200，半径=100，角度从前一个角度到现在的角度，false代表顺时针画圆
            c.arc(200, 200, 100, prevAngle, angle, false);
            //从坐标点（200, 200）结束绘画
            c.lineTo(200, 200);
            c.fill();

            // 每条线结束的时候颜色
            c.strokeStyle = colors[index];
            c.stroke();
            // 每一次绘画结束后开始将当前值赋值给之前的角度，这样计算后面的画的弧度
            prevAngle = angle;

            return c
        })
    }
    //画文字颜色
    const drawCenteredText = (c) => {
        // 文字颜色
        c.fillStyle = "black";
        // 文字大小以及字体
        c.font = "24pt sans-serif";
        // 文字内容
        var text = "饼状图";
        // 计算文字坐标
        var metrics = c.measureText(text);
        c.fillText(text, 250 - metrics.width, 400);
    }

    useEffect(() => {
        // 获取
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        drawBackGround(ctx)
        drawPieData(ctx)
        drawCenteredText(ctx)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <canvas width="375" height="500" id="canvas"></canvas>
    )
}
