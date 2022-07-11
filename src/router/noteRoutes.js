import {lazy} from 'react'
const IntorductNote = lazy(() =>  import ('../pages/Note/introductNote'))
const Note = lazy(() =>  import ('../pages/Note/note'))
const a = [

    {
        path: "/note/*",
        element:<IntorductNote></IntorductNote> ,
        
    },
    {
        path: "/note/normalnote",
        element: <Note></Note>
    },

]
export default a 