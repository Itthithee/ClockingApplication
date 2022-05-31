import {createContext, useReducer} from 'react';

export const ClockingContext = createContext<any>({})
const initialState = {
    imageURI: '',
    userId: '',
    clockingState: '',
    timeStamp: '',
    userData: {}
};
function clockingReducer(state = initialState, {type,payload}: any ){
    switch (type){
        case 'SELECT_USER':
            return {
                ...state,
                userData: payload
            }
        case 'TAKING_PHOTO':
            return {
                ...state,
                imageURI: payload
            }
        case 'CLOCKING':
            return {
                ...state,
                clockingState : payload.clockingState,
                timeStamp: payload.timeStamp
            }
    }
}

export function ClockingProvider({children} : {children? : React.ReactElement}){
    const [clockingState,clockingDispatch] = useReducer(clockingReducer,initialState)
    return(
        <ClockingContext.Provider value={{clockingState,clockingDispatch}}>
            {children}
        </ClockingContext.Provider>
    )
}