// 对象写法
import { lazy, Suspense } from "react"
import { Navigate, createBrowserRouter } from "react-router-dom"
import Home from '@/views/Home'
import App from '@/App'
import Index from '@/views/Index'
import Login from "@/views/Login"
import withAuth from '@/components/Auth'

const Page1 = lazy(() => import('@/views/Page1'))
const About = lazy(() => import('@/views/About'))
const Page2 = lazy(() => import('@/views/Page2'))
const Page3x = lazy(() => import('@/views/Page3x'))
const Page3y = lazy(() => import('@/views/Page3y'))
const Page3z = lazy(() => import('@/views/Page3z'))

// 或者定义一个函数
const withLoadingComponent = (comp: JSX.Element) => (
  <Suspense fallback={<div>loading...</div>}>
    {
      withAuth(comp)
    }
  </Suspense>
)


const routes = [
  {
    path: '/',
    element: withAuth(<App />),
    children: [
      {
        path: 'home',
        element: withAuth(<Home />),
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: 'page1',
            element: withLoadingComponent(<Page1 />)
          },
          {
            path: 'page2',
            element: withLoadingComponent(<Page2 />)
          },
          {
            path: 'page3/x',
            element: withLoadingComponent(<Page3x />)
          },
          {
            path: 'page3/y',
            element: withLoadingComponent(<Page3y />)
          },
          {
            path: 'page3/z',
            element: withLoadingComponent(<Page3z />)
          },
        ]
      },
      {
        path: 'about',
        element: withLoadingComponent(<About />)
      },
      {
        path: 'login',
        element: withAuth(<Login />),
      },
      {
        index: true,
        element: <Navigate to='/home' />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  }
]

export default createBrowserRouter(routes)