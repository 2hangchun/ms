// jsx写法
import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import App from '@/App'
import About from '@/views/About'
import Home from '@/views/Home'

type Props = {}

const baseRouter = (props: Props) => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/' element={<Navigate to='/home'/>}></Route>
                <Route path='about' element={<About/>}></Route>
                <Route path='home' element={<Home/>}></Route>
            </Route>
        </Routes>
    </Router>
  )
}

export default baseRouter