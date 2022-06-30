import React ,{StrictMode,Suspense}from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
const root = ReactDom.createRoot(  document.getElementById('root') )


root.render(
<StrictMode>
    <BrowserRouter>
    <Suspense>
         <App />
    </Suspense>
    </BrowserRouter>
</StrictMode>
)