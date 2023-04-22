import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
// 初始化样式
import 'reset-css'
// UI框架样式或全局样式
// import '@/index.css'
import '@/assets/styles/global.scss'

import { store } from '@/store/store'
import { Provider } from 'react-redux'

import '@/mocks';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)