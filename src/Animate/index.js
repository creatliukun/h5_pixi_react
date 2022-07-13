import * as PIXI from "pixi.js"
import gsap from "gsap"
// 刹车动效开发
class BrakeBanner {
    constructor(selector) {
        // 创建总盒子Application
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xFFFFFFFF,
            resizeTo: window
        })
        // 将实例化Application插入body页面中
        document.querySelector(selector).appendChild(this.app.view)
        // this.app.stage赋值简写
        this.stage = this.app.stage
        // 创建加载器
        this.loader = new PIXI.Loader
        // 加载图片
        this.loader.add("btn.png", 'images/btn.png')
        this.loader.add("brake_bike.png", 'images/brake_bike.png')
        this.loader.add("brake_handlerbar.png", 'images/brake_handlerbar.png')
        this.loader.add("brake_lever.png", 'images/brake_lever.png')
        this.loader.add("btn_circle.png", 'images/btn_circle.png')
        this.loader.load()
        // 加载完成后调用函数
        this.loader.onComplete.add(() => {
            this.show()
        })
    }
    show() {
        let actionButton = this.creatActionButton();
        actionButton.x = actionButton.y = 300;

        const bikeContainer = new PIXI.Container();
        this.stage.addChild(bikeContainer)

        bikeContainer.scale.x = bikeContainer.scale.y = 0.2
        let bikeImage = new PIXI.Sprite(this.loader.resources['brake_bike.png'].texture);
        bikeContainer.addChild(bikeImage)
        // 注意: 图片放至的顺序会影响图片的层级，先放的图片在底层
        // 刹车
        let bikeLeverImage = new PIXI.Sprite(this.loader.resources['brake_lever.png'].texture);
        bikeContainer.addChild(bikeLeverImage)
        bikeLeverImage.pivot.x = bikeLeverImage.pivot.y = 455;
        bikeLeverImage.x = 722;
        bikeLeverImage.y = 900;
        // 手把
        let bikeHandleBarImage = new PIXI.Sprite(this.loader.resources['brake_handlerbar.png'].texture);
        bikeContainer.addChild(bikeHandleBarImage)
        // 创建按钮
        this.stage.addChild(actionButton)
        // 具备和用户交互的能力
        actionButton.interactive = true
        // 小手效果
        actionButton.buttonMode = true
        actionButton.on("mousedown", () => {
            // 旋转刹车,未添加动小时侯效果
            // bikeLeverImage.rotation = Math.PI/180*-30;
            gsap.to(bikeLeverImage, { duration: .6, rotation: Math.PI / 180 * -30 })
            pause()
        })
        actionButton.on("mouseup", () => {
            // 旋转刹车
            // bikeLeverImage.rotation = 0;
            gsap.to(bikeLeverImage, { duration: .6, rotation: 0 })
            start()
        })
        // 监听，让自行车一直出现在画面右下角
        let resize = () => {
            bikeContainer.x = window.innerWidth - bikeContainer.width
            bikeContainer.y = window.innerHeight - bikeContainer.height
        }
        window.addEventListener('resize', resize)
        resize()

        // 创建粒子
        let partialContainer = new PIXI.Container()
        this.stage.addChild(partialContainer)
        // 将粒子盒子旋转35度
        partialContainer.rotation = 35 * Math.PI / 180
        // 设置盒子的中心点
        partialContainer.pivot.x = window.innerWidth / 2
        partialContainer.pivot.y = window.innerHeight / 2
        partialContainer.x = window.innerWidth / 2
        partialContainer.y = window.innerHeight / 2


        let particles = [];
        // 粒子多个颜色
        let colors = [0xf1cf54, 0xb5cea8, 0xf1cf54, 0x8182f]
        for (let i = 0; i < 10; i++) {
            let gr = new PIXI.Graphics();
            gr.beginFill(colors[Math.floor(Math.random() * colors.length)])
            // 绘制小圆点
            gr.drawCircle(0, 0, 6)
            gr.scale.y = 0.3
            gr.scale.x = 0.3
            gr.endFill()
            let pItem = {
                sx: Math.random() * window.innerWidth,
                sy: Math.random() * window.innerHeight,
                gr: gr

            }
            gr.x = pItem.sx
            gr.y = pItem.sy
            partialContainer.addChild(gr)
            particles.push(pItem)
        }
        let speed = 0
        // 持续移动
        const loop = () => {
            speed += .5
            speed = Math.min(speed, 20)
            for (let i = 0; i < particles.length; i++) {
                let pItem = particles[i]
                pItem.gr.y += speed
                if (speed >= 20) {
                    pItem.gr.scale.y = 40
                    // 颗粒感
                    pItem.gr.scale.x = 0.03
                }
                // 超出边界后从画面里面回来继续移动
                if (pItem.gr.y > window.innerHeight) pItem.gr.y = 0
            }
        }

        const start = () => {
            speed = 0
            gsap.ticker.add(loop)
        }
        // 按住鼠标停止
        const pause = () => {
            gsap.ticker.remove(loop)
            for (let i = 0; i < particles.length; i++) {
                let pItem = particles[i]
                pItem.gr.scale.y = .3
                pItem.gr.scale.x = .3
                // ease: 'elastic.out'回弹效果
                gsap.to(pItem.gr, { duration: .6, x: pItem.sx, y: pItem.sy, ease: 'elastic.out' })
            }
        }
        start()
    }
    creatActionButton() {
        let actionButton = new PIXI.Container()

        let btnImg = new PIXI.Sprite(this.loader.resources['btn.png'].texture)
        let btnCircle = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture)
        let btnCircle2 = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture)
        // this.app.stage.addChild(btn_circle)
        actionButton.addChild(btnImg)
        actionButton.addChild(btnCircle)
        actionButton.addChild(btnCircle2)

        btnImg.pivot.x = btnImg.pivot.y = btnImg.width / 2

        btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2
        btnCircle2.pivot.x = btnCircle2.pivot.y = btnCircle2.width / 2

        btnCircle.scale.x = btnCircle.scale.y = 0.8
        // 圆圈gsap加载动效
        gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 })
        gsap.to(btnCircle, { duration: 1, alpha: 0, repeat: -1 })

        return actionButton
    }
}

export default BrakeBanner