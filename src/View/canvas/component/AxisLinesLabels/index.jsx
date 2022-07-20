import React, { useEffect } from 'react'

export default function CanvasComp() {
    // 赋值data数组，后面树状图会用到此数据
    const dataArr = [16, 68, 20, 30, 54];
    // 画蓝色矩形
    const drawCircle = (ctx) => {
        // 给ctx这个画布画上背景颜色，灰色
        ctx.fillStyle = "white";
        // 绘制矩形，从左上角0，0原点开始
        ctx.fillRect(0, 0, 375, 750);
    }

    const drawBlueRect = (ctx) => {
        dataArr.map((item, index) => {
            const _dp = item
            // 给每个树形图赋予蓝色
            ctx.fillStyle = "blue";
            // 从x=25开始，每根柱子距离100,柱子高 750 - _dp * 5，这样写才能是下面对齐，柱子宽50，高是5倍高
            // return ctx.fillRect(25 + index * 100, 30, 50, _dp * 5);
            return ctx.fillRect(20 + index * 60, 750 - _dp * 5 - 10, 35, _dp * 5);
        })
    }
    // 画坐标轴
    const drawAxis = (c) => {
        // 坐标轴颜色
        c.fillStyle = "black";
        // 坐标轴线宽
        c.lineWidth = 2.0;
        // 开始画线
        c.beginPath();
        // 从x=0，y=10的点绘画
        c.moveTo(10, 10);
        //途径x=10，y=740的点绘画
        c.lineTo(10, 740);
        //途径x=10，y=740的点绘画
        c.lineTo(375, 740);
        // 闭合线路
        c.stroke();
    }
    // 画纵坐标标轴文字
    const drawYText = (c) => {
        c.fillStyle = "black";
        for (var i = 0; i < 6; i++) {
            // 画文字
            c.fillText((5 - i) * 20 + "", 0, i * 136 + 60);
            // 每次循环的时候重新开始直线
            c.beginPath();
            c.moveTo(10, i * 136 + 60);
            c.lineTo(20, i * 136 + 60);
            c.stroke();
        }
    }
    // 画横坐标标轴文字
    const drawXText = (c) => {
        var labels = ["JAN", "FEB", "MAR", "APR", "MAY"];
        for (var i = 0; i < 5; i++) {
            c.fillText(labels[i], 30 + i * 60, 750);
        }
    }

    useEffect(() => {

        // 将函数声明和函数调用放在一个useEffect中，更加方便的去实现画布工具，更容易管理
        let canvas = document.getElementById("lk-canvas-id")
        let ctx = canvas.getContext('2d')
        // 画背景
        drawCircle(ctx)
        // 绘制矩阵的蓝色线条
        drawBlueRect(ctx)
        //画坐标轴
        drawAxis(ctx)
        // 画坐标轴文字
        drawYText(ctx)
        drawXText(ctx)
        // []只有页面加载的时候才进行到这个useEffect中
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <canvas id="lk-canvas-id" width="375" height="750">
            当前浏览器不支持，请更新浏览器
        </canvas>
    )
}
