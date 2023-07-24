import { createStore , applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'

const middleware = [thunk]

const initState  = {}

const preloadedState = () => {
    return createStore(
        reducers,
        initState,
        compose(
            applyMiddleware(...middleware),
        )
    )
}

export default preloadedState