import {useRoutes} from 'react-router-dom'
import routes from './router'
import './App.css'

export default function App() {

  return useRoutes(routes)
}
