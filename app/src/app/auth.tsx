// in part from
// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react';

export const logout = () => {
  Cookies.remove('uid')
  Cookies.remove('email')
  Cookies.remove('username')
}

const redirectToLogin = () => {
  const router = useRouter();
  router.push("/login")
  // or history.push('/login') if your Login page is inside the same app
}

// the token is simply the uid, email, name
// for now the token doesn't expire until user logs out or 86400s (1d)
export const authenticate = async (tokens: any) => {
  //if (getRefreshToken()) {
    try {
      const inOneDay = new Date(new Date().getTime() + 86400 * 1000)
      Cookies.set('uid', tokens["uid"], { expires: inOneDay })
      //Cookies.set('refresh_token', tokens.refresh_token)
      Cookies.set('email', tokens["email"], { expires: inOneDay })
      Cookies.set('username', tokens["username"], { expires: inOneDay })

      return true
    } catch (error) {
      redirectToLogin()
      return false
    }
  //}
  /*
  redirectToLogin()
  return false
  */
}

const AuthContext = createContext<{
  auth: any,
  handleAuth: any,
  uid: any,
  username: any,
  email: any
}>({
  auth: null,
  handleAuth: () => {},
  uid: null,
  username: null,
  email: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children } : { children: any }) => {
  const [auth, setAuth] = useState<any>(Cookies.get("username") != undefined);
  const [username, setUser] = useState<any>(Cookies.get("username"));
  const [email, setEmail] = useState<any>(Cookies.get("email"));
  const [uid, setUid] = useState<any>(Number(Cookies.get("uid")));

  useEffect(() => {
    console.log("refres")
    const isAuth = () => {
      try {
        setUser(Cookies.get("username"));
        setEmail(Cookies.get("email"))
        setUid(Number(Cookies.get("uid")))
      } catch(error) {
        console.log(error)
        setUser(null);
        setEmail(null)
        setUid(null)
      };
    };

    isAuth();
  }, [auth]);

  const handleAuth = (auth: boolean) => {
    if (!auth) {
      logout()
    }
    setAuth(auth)
  }

  return (
    <AuthContext.Provider value={{ auth, handleAuth, uid, username, email }}>
      {children}
    </AuthContext.Provider>
  );
};