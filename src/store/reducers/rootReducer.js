import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import homePageReducer from './homePageReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};



const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersisConfog = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}

// const adminPersisConfig = {
//     ...persistCommonConfig,
//     key: 'admin',
//     whitelist: ['']
// }

// export default (history) => combineReducers({
//     router: connectRouter(history),
//     user: persistReducer(userPersistConfig, userReducer),
//     app: persistReducer(appPersisConfog,appReducer),
//     admin: adminReducer
    
// })


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersisConfog,appReducer),
    admin: adminReducer,
    doctor: homePageReducer
  });
  
  export default rootReducer;