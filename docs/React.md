# React

## React15 架构

分为两层

- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Reconciler（协调器）

我们知道，在`React`中可以通过`this.setState`、`this.forceUpdate`、`ReactDOM.render`等 API 触发更新。

每当有更新发生时，**Reconciler**会做如下工作：

- 调用函数组件、或 class 组件的`render`方法，将返回的 JSX 转化为虚拟 DOM
- 将虚拟 DOM 和上次更新时的虚拟 DOM 对比 --- diff
- 通过对比找出本次更新中变化的虚拟 DOM
- 通知**Renderer**将变化的虚拟 DOM 渲染到页面上

### Renderer（渲染器）

由于`React`支持跨平台，所以不同平台有不同的**Renderer**。

- ReactDom 渲染器，浏览器。

- ReactNative 渲染器，渲染 App 原生组件
- ReactTest 渲染器，渲染出纯 Js 对象用于测试
- ReactArt 渲染器，渲染到 Canvas, SVG 或 VML (IE8)

### 缺点

在**Reconciler**中，不管是挂载阶段还是更新阶段都会 **递归** 更新子组件。

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了 16ms，用户交互就会卡顿。

16ms：主流浏览器刷新频率为 60Hz，即每（1000ms / 60Hz）16.6ms 浏览器刷新一次。

`GUI渲染线程`与`JS线程`是互斥的。所以**JS 脚本执行**和**浏览器布局、绘制**不能同时执行。

> ```text
> JS脚本执行 -----  样式布局 ----- 样式绘制
> ```

## React16 架构

分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

可以看到，相较于 React15，React16 中新增了**Scheduler（调度器）**。

### Scheduler（调度器）

由于 requestIdleCallback 有浏览器兼容问题，React 自己实现了一个，并且加上了任务调度

- 任务调度，高优先级的先执行
- [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

### Reconciler（协调器）

在 React15 中**Reconciler**是递归处理虚拟 DOM 的。React16 更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

```js
// The work loop is an extremely hot path. Tell Closure not to inline it.
/** @noinline */
function workLoopSync() {
  // Already timed out, so perform work without checking if we need to yield.
  while (workInProgress !== null) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}

/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

以上就是 **异步可中断更新** 核心点

那么 React16 是如何解决中断更新时 DOM 渲染不完全的问题呢？

在 React16 中，**Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟 DOM 打上代表增/删/更新的标记，类似这样：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

### Renderer（渲染器）

**Renderer**根据**Reconciler**为虚拟 DOM 打的标记，同步执行对应的 DOM 操作。

整个流程：

![process](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/process.png)

红框内由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

```js
// 并发模式从 0 - 2 - 3
// ReactDOM.unstable_createRoot(rootEl).render(<Level />);
// 因为更新被高优先级的中断，执行完高优先级的任务后，继续执行本任务，但是这个时候的count变为2了，所以+1就是3`

// 同步模式从 0 - 1 - 3
// ReactDOM.render(<Level />, rootEl);
```

## Fiber

三层含义

1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的 DOM 节点等信息。
3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 17.0.2 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;
  // 16.13.1
  // this.expirationTime = NoWork;
  // this.childExpirationTime = NoWork;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

![fiber-tree](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/fiber-tree.png)
