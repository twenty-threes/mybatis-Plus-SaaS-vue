import Home from '@/components/homePage'
import Login from '@/components/login'

let routers = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

export default routers
