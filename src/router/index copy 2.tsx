// 对象写法
import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"
import Home from '@/views/Home'
import Page2 from "@/views/Page2"
import App from '@/App'

const About = lazy(() => import('@/views/About'))
const Page1 = lazy(() => import('@/views/Page1'))
const page2 = lazy(() => import('@/views/Page2'))

// 或者定义一个函数
const withLoadingComponent = (comp: JSX.Element) => (
  <Suspense fallback={<div>loading...</div>}>
    {comp}
  </Suspense>
)

/* const routes=[
  {
    path:'/',
    element:<Navigate to='/home'/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/user',
    element:<User/>
  },
] */

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
        children: [
          {
            path: '',
            element: <Navigate to='/page1' />
          },
          {
            path: 'page1',
            element: <Page1 />
          },
          {
            path: 'page2',
            element: <Page2 />
          },
        ]
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: '',
        element: <Navigate to='/home' />
      }
    ]
  }
]

export default routes