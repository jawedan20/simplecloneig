import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import follow from './reducer/follow' ;
import auth from './reducer/auth' ;
import notifikasi from './reducer/notifikasi'
import comment from './reducer/comments'
import thunk from 'redux-thunk' ;

const rootReducer = combineReducers({
    follow,
    auth,
    comment,
    notifikasi,

})
const middlwares = applyMiddleware(thunk)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(middlwares)
)

export default store ;
