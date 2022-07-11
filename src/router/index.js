import {lazy} from 'react'
// const Home = lazy(() =>  import ('../pages/home'))
import Home from '../pages/Home'
const Login = lazy(() =>  import ('../pages/Login'))
const Register = lazy(() =>  import ('../pages/Register'))
const a = [

    {
        path: "/*",
        element:<Home></Home> ,
        // children: [
        //     {
        //         path:'note',
        //         element:() => {
        //             lazy(import ('../pages/Note/introductNote'))
        //         }
        //     }
        // ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },

]
export default a 