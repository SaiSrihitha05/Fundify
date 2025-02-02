//create redux store
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer:{
        userLoginReducer:userReducer
    }
})