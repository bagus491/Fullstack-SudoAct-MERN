import { useState,createContext } from "react";


export const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
    const [UserInfo,setUserInfo] = useState({})

    return(
        <AuthContext.Provider value={{UserInfo, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}