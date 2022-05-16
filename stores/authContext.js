import { createContext, useEffect, useState } from "react";
import { netlifyIdentity } from "netlify-identity-widget";
import netlifyAuth from "../netlifyAuth";

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
});

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

   

    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)

    useEffect(() => {
        netlifyAuth.initialize((user) => {
        setLoggedIn(!!user)
        setUser(user)
    })
    }, [loggedIn]);

    let login = () => {
        netlifyAuth.authenticate((user) => {
          setLoggedIn(!!user)
          setUser(user);
          netlifyAuth.closeModal();
        })
      }
      
      let logout = () => {
        netlifyAuth.signout(() => {
          setLoggedIn(false)
          setUser(null)
        })
      }


    const context = {
        user, login, loggedIn, logout
    }

    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;