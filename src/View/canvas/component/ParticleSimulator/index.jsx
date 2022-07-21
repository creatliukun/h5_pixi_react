import React, { useEffect, useRef } from 'react'

export default function ParticleSimulator() {
    let canvas = useRef(null)
    let timer
    let requestAnimFrame
    // 从window上获取定时器requestAnimFrame
    requestAnimFrame = window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    // 雪花数组数据
    var particles = [];
    var tick = 0;
    const loop = () => {
        timer = requestAnimFrame(loop);
        // // 雪花分4个步骤进行循环
        // 创建雪花
        createParticles();
        // // 更新雪花
        updateParticles();
        // // 杀死雪花
        killParticles();
        // // 绘画雪花
        drawParticles();
    }
    // 创建雪花数据
    const createParticles = () => {
        //每10个勾选push一次
        if (tick % 10 === 0) {
            //如果雪花少于100个，就push创建一个
            if (particles.length < 100) {
                particles.push({
                    x: Math.random() * canvas.current.width, //雪花x轴坐标=0到canvas的宽度
                    y: 0, //初始化是雪花的y轴坐标
                    speed: 2 + Math.random() * 3, //雪花的下落速度[2,5]
                    radius: 5 + Math.random() * 5, //雪花的半径[5,10]
                    color: "white", // 雪花的颜色，白色
                });
            }
        }
    }

    // 对数据进行赋值
    const updateParticles = () => {
        // 修改y轴数据，让小球进行移动
        particles.map((item) => {
            item.y += item.speed;
            return item
        })

    }
    const killParticles = () => {
        // 当小球超出canvas的时候，将其移入到最顶端
        particles.map((item) => {
            item.y += item.speed;
            if (item.y > canvas.current.height) {
                item.y = 0;
            }
            return item
        })

    }
    // 绘制canvas背景&&雪花
    const drawParticles = () => {
        var c = canvas.current.getContext('2d');
        // 颜色为黑色
        c.fillStyle = "black";
        // 绘制矩形背景，为canvas的宽高
        c.fillRect(0, 0, canvas.current.width, canvas.current.height);
        // 利用particles数组里面的数据对小球进行绘制
        particles.map((item) => {
            c.beginPath();
            c.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
            c.closePath();
            c.fillStyle = item.color;
            c.fill();
            return c
        })
    }
    useEffect(() => {
        // 将获取的canvas元素保存在ref.current上，防止每次render的时候重新渲染引起渲染问题
        canvas.current = document.getElementById('canvas-particle');
        loop()
        // 清除定时器
        return () => {
            cancelAnimationFrame(timer)
            console.log('likai', timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <canvas width="375" height="750" id="canvas-particle"></canvas>
    )
}
