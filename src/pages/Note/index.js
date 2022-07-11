import NoteRouters from '../../router/noteRoutes'
import {useRoutes} from 'react-router-dom'
export default function Index() {
  return  useRoutes(NoteRouters)
  
}
