import React, { useEffect } from 'react'
// 用canvas画一个房子
export default function CanvasComp() {
    const drawCircle = (ctx) => {
        console.log(ctx, 'ctx')
    }
    useEffect(() => {
        let canvas = document.getElementById("lk-canvas-id")
        let ctx = canvas.getContext('2d')
        drawCircle(ctx)
    }, [])
    return (
        <canvas id="lk-canvas-id">
            当前浏览器不支持，请更新浏览器
        </canvas>
    )
}
