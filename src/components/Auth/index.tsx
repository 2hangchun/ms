import { useLocation, Outlet, useNavigate, Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element
}

const Auth = (props: Props) => {
    const location = useLocation()
    const token = localStorage.getItem('token') || ''
    console.log(location);

    if (location.pathname !== '/login' && !token) {
        return <Navigate to='/login' />
    }
    else if (location.pathname === '/login' && token) {
        return <Navigate to='/' />
    }
    else {
        return props.children
    }
}

export default function withAuth(comp: JSX.Element) {
    return <Auth>
        {comp}
    </Auth>
}
