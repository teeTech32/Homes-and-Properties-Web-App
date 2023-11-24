import { useState } from "react"
import { toast } from "react-toastify"
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import Oauth from "../components/Oauth"

function SignUp() {
  const [showPassword, setShowpassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const {name, email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    try{
      const auth = getAuth()

     const userCredential = await createUserWithEmailAndPassword(auth, email, password)

     const user =  userCredential.user

     updateProfile(auth.currentUser, {
      displayName: name
     })

     const formDataCopy = {...formData}
     delete formDataCopy.password
     formDataCopy.timestamp = serverTimestamp()

     await setDoc(doc(db, 'users', user.uid), formDataCopy)

     navigate('/')
     toast.success('You are successfully registered')

    }catch(error){
      toast.error('Something whent wrong')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
         <p className="pageHeader">Welcome</p> 
        </header>
        <form onSubmit={onSubmit}>
        <input type="text" 
                 className="nameInput" 
                 value={name} 
                 id="name" 
                 placeholder="Name" 
                 onChange={onChange}  />

          <input type="email" 
                 className="emailInput" 
                 value={email} 
                 id="email" 
                 placeholder="Email" 
                 onChange={onChange}  />

          <div  className="passwordInputDiv">
            <input type= {showPassword ? 'text' : 'password'}
                   placeholder="Password"
                   id="password"
                   onChange={onChange}
                   value={password}
                   className="passwordInput" />
            <img src={visibilityIcon} 
                 alt="show password"
                 className="showPassword"
                 onClick={() => setShowpassword(prevState => !prevState)} />
          </div>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon width={34} height={34} fill="#fff"/>
              </button>
          </div>
        </form>

        <Oauth/>

        <Link to = '/sign-in' className="registerLink">
         <p>Sign In Instead</p>
        </Link>

        

      </div>
    </>
    
  )
}

export default SignUp