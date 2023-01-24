import React, { useEffect, createContext, useReducer } from 'react'

export const AuthContext = createContext();

// //error, loading, success
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

const AuthContextProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('techstuff'))

  const [state, dispatch] = useReducer(authReducer, {
    user: user
  })


  useEffect((user) => {
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider