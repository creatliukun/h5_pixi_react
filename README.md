# 开始

### 创建项目

npx create-react-app +`项目名`

### 运行

```
npm run start
```

### 安装 pixi.js 和 gsap

```
npm install pixi.js
npm install gsap

```

### 适配移动端方案 viewport

- 1, 安装插件

```bash
# 1.npm方式：
npm install postcss-loader postcss-px-to-viewport --save-dev

# 2.yarn安装：
yarn add -D postcss-loader postcss-px-to-viewport

```

- 2，准备将 webpack.config.js 通过命令行暴露出来，此步骤不可逆，不过也有办法回转
- 3，将代码进行保存

```bash
   git add .
   git commit -m "factory: 准备暴露webpack.config.js"
```

- 4 暴露命令：`npm run eject`
  这一步之后有一个报错，我的解决方案是在页面的根目录创建一个`.env`文件，文件中写上`NODE_ENV = "development"`,
  然后在`package.json`文件中找到

```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    // 加上env这一段
    "env": {
      "NODE_ENV": "development"
    }
  },
```

- 5，进行配置
  找到暴露出来的 webpack.config.js,在 config 文件夹中，然后对里面的数据进行配置，如果入下面的结构可以这样配置
  !["webpack"](https://cdn.staticaly.com/gh/creatliukun/picx@master/images/webpack.171qopda7ohs.jpg "webpack")
  <img src="https://cdn.staticaly.com/gh/creatliukun/picx@master/images/webpack.171qopda7ohs.jpg" width="200"  alt="支付宝小程序"/><br/>
  加入这段代码
  ```
  [
  'postcss-px-to-viewport',
  {
    viewportWidth: 750, // (Number) The width of the viewport.
    viewportHeight: 1334, // (Number) The height of the viewport. -- 一般不需要配置
    unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
    viewportUnit: "vw", // (String) Expected units.
    selectorBlackList: [], // (Array) The selectors to ignore and leave as px.
    minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
    mediaQuery: false // (Boolean) Allow px to be converted in media queries.
  }
  ],
  ```

* [页面相关的 dp](https://juejin.cn/post/6844903845617729549#heading-28)

* vh、vw 方案即将视觉视口宽度 window.innerWidth 和视觉视口高度 window.innerHeight 等分为 100 份。

### 安装 cross-env 插件，进行识别环境地址

````bash
# 使用npm安装
npm i -D cross-env
# 使用yarn安装
yarn add cross-env
```
````
