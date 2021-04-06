# react 调试

调试源码，需要打包react的源码为dev环境可以使用的 `cjs` 包。以及使用 `create-react-app` 创建一个新项目。

1. 下载源码

   ```sh
   # 拉取代码
   git clone https://github.com/facebook/react.git
   
   # 如果拉取速度很慢，可以考虑如下2个方案：
   
   # 1. 使用cnpm代理
   git clone https://github.com.cnpmjs.org/facebook/react
   
   # 2. 使用码云的镜像（一天会与react同步一次）
   git clone https://gitee.com/mirrors/react.git
   ```

   或者直接解压当前目录压缩包：react-17.0.2

2. 安装依赖

   ```sh
   # 切入到react源码所在文件夹
   cd react
   
   # 安装依赖
   yarn
   ```

3. 打包`react`、`scheduler`、`react-dom`三个包为dev环境可以使用的`cjs`包。

   ```sh
   # 执行打包命令
   yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE
   ```

4. `npm link` 改变项目中依赖包的目录指向

   ```sh
   cd build/node_modules/react
   # 申明react指向
   npm link
   cd build/node_modules/react-dom
   # 申明react-dom指向
   npm link
   ```

5. 本项目为 `create-react-app`  创建的项目

   ```sh
   # 直接在项目内运行
   npm link react react-dom
   ```

6. 现在试试在`react/build/node_modules/react-dom/cjs/react-dom.development.js`中随意打印些东西。

7. `npm start` 即可看见console的内容。

8. 查看 `npm link` 包的路径

   ```sh
   npm ls --global react
   npm ls --global react-dom
   ```

   