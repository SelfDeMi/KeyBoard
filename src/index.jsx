import React ,{StrictMode,Suspense}from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
const root = ReactDom.createRoot(  document.getElementById('root') )

root.render(
<StrictMode>
    <BrowserRouter>
    <Suspense>
        <Provider  store={store} >
             <App />
        </Provider>
        
    </Suspense>
    </BrowserRouter>
</StrictMode>
)