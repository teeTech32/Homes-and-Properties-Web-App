import {useNavigate, useLocation} from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { setDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

export default function Oauth() {
  const location = useLocation()
  const navigate = useNavigate()
  
 const onGoogleClick = async() => {
  try{
    const auth = getAuth()
    const Provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, Provider)
    const user = result.user

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      })
    }

    navigate('/')
    toast.success('You have successfully loggedIn With Google')

  }catch(error){
    toast.error("Couldn't Loggedin with google")
  }

 }

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname==='/sign-up' ? 'Up With' : 'In With'}</p>
      <button className='socialIconDiv' onClick = {onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}
