import {createContext, useReducer} from 'react';

export const SearchContext = createContext<any>({})
const initialState = {
    isFetching: false,
    items : [],
    filteredItems : [],
};
const searchReducer = (state = initialState, {type,payload}:any )=>{
    switch (type){
        case 'FETCHING_ITEMS':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCHING_SUCCESS':
            return {
                ...state,
                isFetching: false,
                items : payload,
                filteredItems : state.items
            }
        case 'SHOW_ALL_ITEMS':
            return {
                ...state,
                filteredItems : state.items
            }
        case 'SHOW_FILTERED_ITEMS':
            return {
                ...state,
                filteredItems : state.items.filter(
                    ({title} :{title:string})=>
                    title.toLowerCase().includes(payload.toLowerCase())
                )
            }
    }
}

export function SearchProvider({children} : {children? : JSX.Element}){
    const [state,dispatch] = useReducer(searchReducer,initialState)
    return(
        <SearchContext.Provider value={{state,dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}