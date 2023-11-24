import {useEffect, useState, useRef} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingIn, setCheckingIn] = useState(true)
  const isMounted = useRef(true)

  useEffect(()=> {
    if(isMounted){
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user){
          setLoggedIn(true)
        }
        setCheckingIn(false)
      })
    }
   return () =>{
    isMounted.current = false
   } 
  }, [isMounted])

  return {checkingIn, loggedIn}
}
