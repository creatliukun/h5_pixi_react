import React, { useEffect, useState } from 'react'
import AxisLinesLabels from './component/AxisLinesLabels'
import PieChart from './component/Piechart'
// 用canvas画一个房子
export default function CanvasComp() {
    const [currentCanvas, setCurrentCanvas] = useState(1)
    const clickToggle = () => {
        console.log("clickToggle")
        const randomNum = parseInt(Math.random()*10)
        setCurrentCanvas(randomNum)
    }

    const ShowNeedComp = () => {
        return (
            <>
                {currentCanvas === 0 && <AxisLinesLabels />}
                {currentCanvas === 1 && <PieChart />}
            </>

        )
    }


    // useEffect(() => {

    //     // 将函数声明和函数调用放在一个useEffect中，更加方便的去实现画布工具，更容易管理
    //     let canvas = document.getElementById("lk-canvas-id")
    //     let ctx = canvas.getContext('2d')
    //     // 画背景
    //     drawCircle(ctx)
    //     // 绘制矩阵的蓝色线条
    //     drawBlueRect(ctx)
    //     //画坐标轴
    //     drawAxis(ctx)
    //     // 画坐标轴文字
    //     drawYText(ctx)
    //     drawXText(ctx)
    //     // []只有页面加载的时候才进行到这个useEffect中
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    return (
        <div style={{
            width: "375px",
            height: "750px",
            position: "relative"
        }}>
            <div
                style={{
                    width: "60px",
                    height: "30px",
                    lineHeight: '30px',
                    textAlign: 'center',
                    background: '#c9f846',
                    borderRadius: '6px',
                    position: "absolute",
                    top: '10px',
                    right: '50px'
                }}
                onClick={clickToggle}
            >切换{currentCanvas}</div>
            <ShowNeedComp />
        </div>

    )
}
