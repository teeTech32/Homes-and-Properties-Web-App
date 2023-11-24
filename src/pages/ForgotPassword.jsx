import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'


function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e =>{
    setEmail(e.target.value)
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    try{

      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email sent successfully')

    }catch(error){
      toast.error('Could not send Email')
    }

  }

  return (
    <div className="pageContainer">
        <header>
          <p className="pageHeader"> Forgot Password</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="email" 
                  value={email} 
                  id="email" 
                  placeholder="Email" 
                  onChange={onChange} className="emailInput" />
            
            <Link className="forgotPasswordLink" to='/sign-in'>
              Sign In 
            </Link>
            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width={34} height={34}/>
              </button>
            </div>
          </form>
        </main>  
    </div>
  )
}

export default ForgotPassword