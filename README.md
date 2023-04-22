# Process

入口文件 mian.js 中样式引入，初始化样式一般放最前面，然后全局样式等等

配置路径别名 vite.config.ts

配置路径别名提示 tsconfig.json

全局引入 css 会影响所有的组件，采用模块化引入

使用 scss，只需安装 sass 即可

antd@5.x支持样式按需引入，无需配置，4.x 不支持需要配置

```js
import vitePluginImp from 'vite-plugin-imp'
...
export default defineConfig({
    ...
    plugins: [
        react(),
        vitePluginImp({
        libList: [
            {
            libName: 'antd',
            style(name) {
                return `antd/es/${name}/style/index.js`
            }
            },
        ]
        })
    ],
    ...
})
```

components 文件夹放公共组件，views 文件夹放路由组件

路由配置:

- 旧写法（jsx 写法），由 BrowserRouter 组件包裹来创建路由器，使用 Routes，Route 组件配置路由，使用 Outlet 占位，最后在入口文件 main.js 中直接渲染路由器。（疑惑？根路由没有 Outlet 显示在哪里，一般根路由是直接匹配“/”，然后渲染在 root 根节点，然后它的子路由就需要使用 Outlet 来决定在哪里展示）。
- 新写法 1（对象写法），通过对象的方式创建 routes，在入口文件 main.js 中由 BrowserRouter 组件包裹根组件 App，在 App 组件中使用 hook useRoutes 传入 routes 返回 jsx，可以渲染 route tree，匹配的时候。
- 新写法 2（对象写法）最新，还是通过对象的方式创建 routes，引入 createBrowserRouter 创建 router，在入口文件 main.js 中引入 RouterProvider 组件，传入 router，直接渲染，引入 Outlet 组件展示子路由。

路由懒加载（异步加载，需要使用 Suspense 组件包裹，需要传递 fallback，加载阶段显示的组件）,

```jsx
import { lazy, Suspense } from "react";

function App() {
  //...
  return (
    <>
      <Suspense fallback={<Loading />}>//....</Suspense>
    </>
  );
}
```

跳转时使用相对路径（相对于当前所呈现的路由路径，而不是相对于完整的 URL）

```jsx
<Route path="home" element={<Home />}>
  <Route path="project/:projectId" element={<Project />}>
    <Route path=":taskId" element={<Task />} />
  </Route>
</Route>
```

在 Project 组件中，当前路径为`/home/project/123`

| In `<Project>` @ `/home/project/123` | Resolved `<a href>`     |
| ------------------------------------ | ----------------------- |
| `<Link to="abc">`                    | `/home/project/123/abc` |
| `<Link to=".">`                      | `/home/project/123`     |
| **`<Link to="..">`**                 | **`/home`**             |
| **`<Link to=".." relative="path">`** | **`/home/project`**     |

useLocation 获取当前路径

获取数组最后一个元素：数组方法 arr.pop()，arr.at(-1)，arr.slice(-1),arr.reverse()[0],arr[arr.length-1]

变量后面加“!”表示变量一定存在

覆盖 UI 组件样式，找到对应的元素，获取类名，声明新的样式（注意样式权重）

全局声明文件，类型声明文件不要直接使用 import 引入文件，而是使用 import()

CommonJS 模块，通过 require 加载（”运行时加载“），输出一个对象，再从对象上访问属性；ES6 模块（“编译时加载”或静态加载）不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
CommonJS 模块和 ES6 模块的区别：

- CommonJS 模块输出的是一个值的拷贝（也就是说，一旦输出一个值，模块内部的变化就影响不到这个值），ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

```js
export var foo = "bar";
setTimeout(() => (foo = "baz"), 500);
```

上面代码输出变量 foo，值为 bar，500 毫秒之后变成 baz。这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新。
import 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。如果变量指向一个对象，改写对象的属性是允许的。并且其他模块也可以读到改写后的值。
如果多次重复执行同一句 import 语句（加载同一个模块），那么只会执行一次，而不会执行多次。
模块的整体加载，用星号（\*）指定一个对象，所有输出值都加载在这个对象上面。
export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字

script 标签的 defer 和 async，defer 是渲染完执行（页面出现多个 defer 脚本，顺序执行），async 是加载完执行（页面出现多个 async 脚本，不能保证顺序执行）。`<script type="module" src="./xxx.js"></script>`等同于`<script type="module" src="./xxx.js" defer></script>`

请求参数和返回值的类型都需要类型约束

管理系统跳转逻辑：

- 如果访问的是登录页面，存在 token，重定向到首页；
- 如果访问其他页面（除了登录页面），没有 token，重定向到登录页面；
- 其余的正常放行；
