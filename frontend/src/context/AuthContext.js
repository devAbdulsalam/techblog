import React, {useEffect, createContext, useReducer} from 'react'

export const AuthContext = createContext();

// //error, loading, success
export const authReducer = (state, action, error) =>{
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, loading : false, success : true}
    case 'LOGIN_FAILED':
      return { user: null, error : error, loading : false}
    case 'LOGOUT':
      return { user: null, loading : false, success : true}
    case 'SIGNUP_FAILED':
      return {user: null, error: error, loading : false}
    default:
      return state
  }

}

const AuthContextProvider = ({children}) => {
  const user = JSON.parse(localStorage.getItem('techstuff'))

  const [state, dispatch] = useReducer(authReducer, {
        user : null,
        loading: false,
        success : false,
        error: "no user Available"
    })


   useEffect((user) => {
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user, loading : false, success : true}) 
    }
  }, [user])
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider