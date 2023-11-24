import {  useState } from "react"
import {  useNavigate } from "react-router-dom"
import {getAuth, updateProfile} from 'firebase/auth'
import { db } from "../firebase.config"
import { updateDoc, doc } from "firebase/firestore"
import {toast} from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
   email: auth.currentUser.email,
   name: auth.currentUser.displayName
  })
  const {name, email} = formData
  const navigate = useNavigate()

 const onLogout = () =>{
  auth.signOut()
  navigate('/')
 }

 const onSubmit = async() =>{
 try{
  
  if(auth.currentUser.displayName !== name){
    // Update the firebase
    await updateProfile(auth.currentUser, {
      displayName: name
    })
  }
   // Update in firestore
  const userRef = doc(db, 'users', auth.currentUser.uid)
  await updateDoc(userRef, {
    name,
  } )
  toast.success('Profile has been updated successfully')

 }catch(error){
  toast.error('Profile could not be updated')
 }
 }

 const onChange = (e) =>{
  setFormData((prevState) => ({...prevState,
    [e.target.id]:e.target.value
  }))
  
 }
 
  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">
        My Profile
      </p>
      <button className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={()=>{
          changeDetails && onSubmit()
          setChangeDetails((prevState)=> !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>
      <div className="profileCard">
        <form>
          <input type="text" 
                 id="name" 
                 value={name} 
                 onChange={onChange} 
                 className={!changeDetails ? 'profileName' : 'profileNameActive'}
                 disabled={!changeDetails} />
          <input type="text" 
                 id="email" 
                 value={email} 
                 onChange={onChange} 
                 className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                 disabled={!changeDetails} />
        </form>

      </div>
    </main>
    
  </div>
}

export default Profile