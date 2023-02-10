import React,  {Suspense} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

window.onload = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <Suspense fallback="...loading">
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Suspense>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    )
}
