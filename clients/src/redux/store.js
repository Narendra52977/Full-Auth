import React  from "react";

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import rootReducer from './reducers/';
const store=createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
function DataProvider({children}){
    return <div>
       <Provider store={store}>
    {children}
       </Provider>
    </div>
}

export default DataProvider;